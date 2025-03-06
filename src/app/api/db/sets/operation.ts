import { Database, ManageDatabase, Transaction } from './connection';

// types
type typeDefObj = Record<string, TypeNames>;
type MappedType<T extends typeDefObj> = {[K in keyof T]: Definer<T[K]>;};
  // options
  type options = string;
    type Definer<T extends TypeNames> =
      T extends `${string} not null` ? TypeNameToType<T> :
      T extends `${string} primary key` ? TypeNameToType<T> :
      T extends `${string} generated always as identity` ? TypeNameToType<T> :
      T extends freeInsertType<definedInsertType> ? unknown :
      null | TypeNameToType<T>;
    // type ReturnDefiner<T extends TypeNames> =
    //   T extends withTypeUD<infer A> ? Definer<A> :
    //   Definer<T>;
  type TypeNames = definedInsertType | freeInsertType<definedInsertType>;
    type TypeNameToType<T extends TypeNames> =
      T extends varchar ? string :
      T extends integer ? number :
      T extends date ? Date | string :
      T extends geometry ? `Point(${number} ${number})` :
      T extends userDefined ? string :
      T extends time ? string :
      never;
    type notUDtype = array | notArrayType;
      type array = `${notArrayType}[]${` ${options}` | ''}`;
    type notArrayType = varchar | integer | date | geometry | time;
      type varchar = `varchar(${number})${` ${options}` | ''}`;
      type integer = `integer${` ${options}` | ''}`;
      type date = `date${` ${options}` | ''}`;
      type geometry = `geometry(${'Point' | 'Linestring' | 'Polygon'}, 3857)${` ${options}` | ''}`;
      type time = `time${` ${options}` | ''}`;
    type definedInsertType = notUDtype | userDefined;
      type userDefined = `ud_${string}`;
    type freeInsertType<T extends definedInsertType> = ['ud', T];

// placeholders
type MappedPh<T extends typeDefObj> = {[K in keyof T]?: TypeNameToPh<T[K]>;};
  type ph = `$${number}`;
    type TypeNameToPh<T extends TypeNames> =
      T extends geometry ? gphf :
      T extends integer ? dphf | sphf :
      T extends userDefined ? phf :
      T extends freeInsertType<definedInsertType> ? phf :
      dphf;
    type phf = (...num: number[]) => string;
    type dphf = (nums: number) => ph;
    type gphf = (nums: number) => `ST_GeomFromText(${ph}, 3857)`;
    type sphf = () => `default`;

// selectKeys
type selectKey<T extends typeDefObj> = notas<T> | asProp<notas<T>, string>;
  
  type selectReturnType<T extends typeDefObj, P extends readonly selectKey<T>[]> = {
    [K in P[number] as keyNameDefiner<T, K>]: selectPropDefiner<T, K>
  };
  type keyNameDefiner<T extends typeDefObj, K extends selectKey<T>> =
    K extends asProp<notas<T>, infer S> ? S :
    K extends STX<T> ? `st_x` :
    K extends STY<T> ? `st_y` :
    K;
  type notas<T extends typeDefObj> = Extract<keyof T | func<T>, string>;
    type asProp<T extends notas<typeDefObj>, S extends string> = `${Extract<T, string>} as ${S}`;
  type func<T extends typeDefObj> = STX<T> | STY<T>;
    type selectPropDefiner<T extends typeDefObj, K extends selectKey<T>> = 
      K extends asProp<infer U extends notas<T>, string> ? selectPropDefinerNotAs<T, U> :
      K extends notas<T> ? selectPropDefinerNotAs<T, K> :
      never; 
    type selectPropDefinerNotAs<T extends typeDefObj, K extends notas<T>> = 
      K extends STX<T> ? number :
      K extends STY<T> ? number :
      K extends keyof T ? Definer<T[K]> :
      never; 
    type STX<T extends typeDefObj> = `ST_X(${Extract<keyof T, string>})`;
    type STY<T extends typeDefObj> = `ST_Y(${Extract<keyof T, string>})`;

type updateArgsType<T extends typeDefObj> = Partial<MappedType<T>>;

type tableConstructObject<T extends typeDefObj> = {
  name: string,
  define: T,
  constraint?: string,
  query?: string,
  placeHolders?: MappedPh<T>,
};

export class table<T extends typeDefObj> {
  name: string;
  def: T;
  client: Database | ManageDatabase | Transaction;
  tableConstraint: string | null;
  keys: (keyof T)[];
  placeHolders: string[];
  joinedKeys: string;
  joinedPlaceHolders: string;
  tableQuery: string;
  // isRelease: boolean;
  constructor(obj: tableConstructObject<T>, client: Database | ManageDatabase | Transaction) {
    this.name = obj.name;
    this.def = obj.define;
    this.client = client;
    this.tableConstraint = obj.constraint || null;
    this.keys = Object.keys(obj.define);
    // this.isRelease = isRelease == undefined ? false : true;
    const placeHolders: string[] = [];
    const defined: MappedPh<T> = obj.placeHolders || {};
    let index = 1;
    for (const key of this.keys) {
      const dphf: dphf = (num: number) => `$${num}`;
      const ph: phf = defined[key] || dphf;
      const args: number[] = [];
      for (let i = 0; i < ph.length; i++) {
        args.push(index);
        index++;
      };
      placeHolders.push(ph(...args));
    };
    this.placeHolders = placeHolders;
    this.joinedKeys = this.keys.join(', ');
    this.joinedPlaceHolders = this.placeHolders.join(', ');
    this.tableQuery = obj.query || '';
    return this;
  };
  protected async run(query: string, params?: unknown[]) {
    try {
      const res = await this.client.run(query, params);
      return res;
    } catch (e) {
      console.log(e);
      throw new Error('query failed');
    };
  };
  protected async execute<K extends readonly selectKey<T>[]>(sql: string, placeholders?: Definer<TypeNames>[]) {
    try {
      const res = await this.run(sql, placeholders);
      const rows = res.rows;
      const returns: selectReturnType<T, K>[] = [];
      rows.forEach((row) => {
        if (!isObj(row)) {return};
        returns.push(row as typeof returns[number]);
      });
      return returns;
    } catch (e) {
      console.log(e);
      throw new Error('query failed');
    };
  }
  async selectEqual<K extends readonly selectKey<T>[]>(
    // compareKey: U,
    // compareStr: ReturnDefiner<T[U]>,
    compareObj: updateArgsType<T>,
    selectKeys: K,
    isLike?: boolean
  ) {
    const like = isLike == undefined ? false : isLike;
    const phStrs: (string | number | undefined | unknown)[] = [];
    const sql = `
      select ${selectKeys.join(', ')}
      from ${this.name}
      where ${
        Object.entries(compareObj).map(([key, val], i) => {
          phStrs.push(like ? `${val}%` : val);
          return `${key} ${like ? 'like' : '='} $${i+1}`;
        }).join(' and ')
      }
    `;
    try {
      const res = await this.execute<K>(sql, phStrs);
      return res;
    } catch (e) {
      console.log(e);
      return [];
    };
  };

  // async selectEqualArr<K extends readonly selectKey<T>[], U extends keyof T & string>(
  //   compareKey: U,
  //   compareStrs: ReturnDefiner<T[U]>[],
  //   selectKeys: K
  // ) {

  //   const sql = `
  //     select ${selectKeys.join(', ')}
  //     from ${this.name}
  //     where ${compareKey} in (${compareStrs.map((_, i) => `$${i+1}`).join(', ')})
  //   `;
  //   try {
  //     const res = await this.execute<K>(sql, compareStrs);
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //     return [];
  //   };
  // };



  // 管理用
  async create() {
    const conv = (val: TypeNames | undefined): definedInsertType => {
      if (!val) return 'varchar(0)';
      else if (isNotArr(val)) return val;
      else if (isWithTypeUD(val)) return val[1];
      return val;
    };
    const isNotArr = (val: TypeNames): val is definedInsertType => !isArr(val);
    const isWithTypeUD = (val: TypeNames): val is freeInsertType<definedInsertType> => val[0] == 'ud' && !!val[1];
    const sql = `
      drop table if exists ${this.name} cascade;
      create table ${this.name} (
        ${Object.keys(this.def).map(k => `${k} ${conv(this.def[k])}`).join(',\n')}
        ${this.tableConstraint ? `,\n${this.tableConstraint}` : ''}
      );
      ${this.tableQuery || ''}
    `;
    console.log(sql)
    await this.run(sql);
  };
  async insert(data: MappedType<T>) {
    const sql = `
      insert into ${this.name} (${this.joinedKeys}) values (${this.joinedPlaceHolders}) on conflict do nothing;
    `;
    await this.run(sql, [...this.keys.map(k => data[k]).flat()]);
  };
  async returningInsert<K extends readonly selectKey<T>[]>(data: MappedType<T>, returningKeys: K, query?: string) {
    const sql = `
      insert into ${this.name} (${this.joinedKeys})${query ? ` ${query}` : ''} values (${this.joinedPlaceHolders}) on conflict do nothing returning ${returningKeys.join(', ')};
    `;
    const res = await this.execute<K>(sql, [...this.keys.map(k => data[k]).flat()]);
    return res[0] ? res[0] : undefined;
  };
  async selectAll<K extends readonly selectKey<T>[]>(selectKeys: K) {
    const sql = `
      select ${selectKeys.join(', ')}
      from ${this.name};
    `;
    try {
      return await this.execute<K>(sql);
    } catch (e) {
      console.log(e);
      return [];
    };
  };
  async update<U extends updateArgsType<T>, C extends updateArgsType<T>>(updateContents: U, compareContents: C) {
    let phCount: number = 0;
    const getPH = () => {phCount+=1; return `$${phCount}`};
    const phVals: (MappedType<T>[string] | undefined)[] = [];
    const sql = `
      update ${this.name}
      set 
        ${Object.entries(updateContents).map(([key, val]) => {phVals.push(val); return `${key} = ${getPH()}`}).join(',\n')}
      where 
        ${Object.entries(compareContents).map(([key, val]) => {phVals.push(val); return `${key} = ${getPH()}`}).join(' and \n')}
    `;
    await this.run(sql, phVals)
  }
};

const isObj = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && (typeof obj === 'object' || typeof obj === 'function');
};

const isArr = (arr: unknown): arr is [] => {
  return Array.isArray(arr);
}