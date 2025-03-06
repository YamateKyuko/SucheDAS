import Link from 'next/link'
import styles from './ui.module.css'

export function Pattern(props: {name: string | null, headsign: string | null, pattern_id: number}) {
  return (
    // <li>
      <Link href={`/bus/pattern?pattern_id=${props.pattern_id}`}>
        <p className={styles.pattern}>
          <span>
            <span>{props.name}</span>
          </span>
          {props.headsign}
        </p>
      </Link>
    // </li>
  )
}
