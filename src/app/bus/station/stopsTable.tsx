import { getPatterns } from '@/app/lib/data';
import Link from 'next/link';
import { Pattern } from '../ui/pattern';
import styles from './style.module.css'

export default async function StopsTable(props: { param: number }) {
  const patterns = await getPatterns({station_id: props.param});
  if (!patterns) return <ul></ul>;
  const stops: Map<string, typeof patterns> = new Map();
  patterns.forEach(pattern => {
    const stop = stops.get(pattern.stop_id) || [];
    stop.push(pattern);
    stops.set(pattern.stop_id, stop);
  });
  return (
    <ul>
      {Array.from(stops.entries()).map(([stopId, patterns], index) => (
        <li key={`${stopId}-${index}`} className={styles.stop}>
          <Link href={`/bus/stop?stop_id=${stopId}`}></Link>
          {patterns[0] && <h2><span>{patterns[0].platform_code}</span>{patterns[0].stop_name}</h2>}
          <ul>
            {patterns.map((pattern, index) => (
              <li key={`${pattern.pattern_id}-${index}`}>
                <Pattern
                  long={pattern.route_long_name}
                  short={pattern.route_short_name}
                  headsign={pattern.stop_headsign}
                  pattern_id={pattern.pattern_id}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
