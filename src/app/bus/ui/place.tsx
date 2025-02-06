import { getMuni } from "@/app/lib/data";
import styles from './ui.module.css';

export function Place(props: {code: number | null, town: string | null}) {
  if (!props.code) return <p></p>;
  const muni = getMuni(props.code);
  if (!muni) return <p></p>;
  return (
    <p className={styles.place}>{muni.pref}{muni.city}{props.town}</p>
  )
}
