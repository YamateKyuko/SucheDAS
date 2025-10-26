import { Pool, PoolClient } from 'pg';

const getEnv = (key: string): string => {
  return process.env[key] || '';
};

const pool = new Pool({
  host: getEnv('DB_HOST'),
  user: getEnv('DB_USER'),
  port: Number(getEnv('DB_PORT')),
  password: getEnv('DB_PASSWORD'),
  database: getEnv('DB_NAME'),
});

export class Database {
  mode = 'database';
  private client: PoolClient;

  constructor(con: PoolClient) {
    this.client = con;
  }
  static async init(): Promise<Database> {
    try {
      return new Database(await pool.connect());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async run(query: string, params?: unknown[]) {
    const res = await this.client.query(query, params);
    return res;
  }
  async begin() { await this.run('BEGIN'); };
  async commit() { await this.run('COMMIT'); };
  async rollback() { await this.run('ROLLBACK'); };
  async Transaction<T extends Array<unknown>, K>(callback: (client: Transaction, ...args: T) => Promise<K>, ...args: T): Promise<K> {
    try {
      await this.begin();
      const res = await callback(new Transaction(this.client), ...args);
      await this.commit();
      await this.release();
      return res;
    } catch (error) {
      await this.rollback();
      console.log(error);
      throw error;
    }
  };
  async release() { if (this.client) this.client.release() };

  static async query(query: string, params?: unknown[]) {
    try {
      const db = await this.init();
      const res = await db.run(query, params);
      await db.release();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

const managePool = new Pool({
  host: getEnv('DB_MANAGE_HOST'),
  user: getEnv('DB_MANAGE_USER'),
  port: Number(getEnv('DB_MANAGE_PORT')),
  password: getEnv('DB_MANAGE_PASSWORD'),
  database: getEnv('DB_MANAGE_NAME'),
});

export class ManageDatabase extends Database {
  mode = 'manage';
  static async init(): Promise<Database> {
    try {
      return new Database(await managePool.connect());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export class Transaction {
  mode = 'transaction';
  client: PoolClient;

  queryStore: string = "";

  constructor(client: PoolClient) {
    this.client = client;
  }
  async run(query: string, params?: unknown[]) {
    return (await this.client.query(query, params));
    // this.queryStore = this.queryStore + query;
    // return;
    // console.log(params);
  }
  async release() {}
  async query() {}
}