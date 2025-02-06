import { getPatterns } from '@/app/lib/data';
import Link from 'next/link';
import styles from './style.module.css'

export default async function StopsTable(props: { id: number }) {
  const patterns = await getPatterns({pattern_id: props.id});
  if (!patterns) return <ul></ul>;
  return (
    <ul>
      {patterns.map((pattern, index) => (
        <li key={`${pattern.stop_sequence}-${index}`} className={styles.stop}>
          <Link href={`/bus/stop?stop_id=${pattern.stop_id}`}></Link>
          <p className={styles.sequence}>
            {pattern.stop_sequence}
          </p>
          {index !== patterns.length - 1 && <span className={styles.line}></span>}
          <h2><span>{pattern.platform_code}</span>{pattern.stop_name}</h2>
          <p>地図</p>
          <p>時刻表</p>
        </li>
      ))}
    </ul>
  )
}
