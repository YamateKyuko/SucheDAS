import React from 'react'
import { Suspense } from 'react'
import { pageProps } from '@/app/bus/types';
import StopsTable from '@/app/bus/pattern/stopsTable';
import { getStrFromObj } from '@/app/lib/escape';
import { getNum } from '@/app/api/common/vali';
import PatternName from './patternName';
import styles from './style.module.css'

const paramName = 'pattern_id';

export default async function Page(props: pageProps) {
  const p = getStrFromObj(await props.searchParams, paramName);
  if (!p) return <article><h1>停留所を選択してください</h1></article>;
  const param = getNum(p[paramName], true);
  if (!param) return <article><h1>停留所を選択してください</h1></article>;

  return (
    <article className={styles.patterns}>
      <section>
        <PatternName id={param} />
      </section>
      <Suspense key={param} fallback={<p>検索中</p>}>
        <StopsTable id={param} />
      </Suspense>
    </article>
  );
};