import React from 'react'
import { Suspense } from 'react'
import { paramProps } from '@/app/bus/types';
import StopsTable from '@/app/bus/station/stopsTable';
import { getNum } from '@/app/api/common/vali';
import StationName from './stationName';
import { getStrFromObj } from '@/app/lib/escape';

const paramName = 'station_id';

export default async function Page(props: paramProps) {
  const p = getStrFromObj(await props.searchParams, paramName);
  if (!p) return <article><h1>パラメータがありません</h1></article>;
  const param = getNum(p[paramName], true);
  if (!param) return <article><h1>停留所を選択してください</h1></article>;
  return (
    <article>
      <section>
        <StationName id={param} />
        <p>地図</p>
        <p>近くの停留所</p>
      </section>
      <Suspense key={param} fallback={<p>検索中</p>}>
        <StopsTable param={param} />
      </Suspense>
    </article>
  );
};