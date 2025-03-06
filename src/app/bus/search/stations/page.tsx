import React from 'react'
import { Suspense } from 'react'
import SearchBox from '@/app/bus/ui/searchBox'
import { paramProps } from '@/app/bus/types';
import StatonsTable from '@/app/bus/search/stations/stationsTable';
import { getStrFromObj } from '@/app/lib/escape';
// import { stationsTable } from '@/app/ui/bus/stationsTable';
// import BusstopPoleTable from '@/app/ui/bus/busstopPole-table';
// import { BusstopPole } from '@/app/class/classes';

const paramName = 'station_name';

export default async function Page(props: paramProps) {
  const p = getStrFromObj(await props.params, paramName);
  if (!p) return <article><section><h1>パラメータを指定してください。</h1></section></article>;
  const param = p[paramName];
  return (
    <article>
      <section>
        <h1>停留所を探す</h1>
      </section>
      
      <SearchBox placeholder='停留所を検索' paramName={paramName} debounce={2000} />
      <Suspense key={param} fallback={<p>検索中</p>}>
        <StatonsTable param={param} />
      </Suspense>
    </article>
  )
};

// const isStr = (str: string | string[] | undefined | number): str is string => {return typeof str === 'string';};