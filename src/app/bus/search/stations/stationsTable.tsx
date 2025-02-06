import { getStations } from '@/app/lib/data';
import Link from 'next/link';
import React from 'react'
import { Place } from '../../ui/place';
import styles from './style.module.css'

export default async function StationsTable(props: { param: string }) {
  if (props.param.length < 2) return <ul></ul>;
  const stations = await getStations({ station_name: props.param });
  return (
    <ul>
      {stations && stations.map((station, index) => (
        <li key={`${station.station_id}-${index}`} className={styles.station}>
          <Link href={`/bus/station?station_id=${station.station_id}`}>
          </Link>
          <h2>{station.station_name}</h2>
          <Place code={station.station_muni} town={station.station_town} />
        </li>
      ))}
    </ul>
  )
}



// const sameBusstopPole = (a: BusstopPole, b: BusstopPole): boolean => {















// ______________________________________________________________________________________

// type template_summarisedBusstopPole = {
//   title: string,
//   position: [number, number],
//   busstopPoles: BusstopPole[],
// }

// const summarisedBusstopPoles: template_summarisedBusstopPole[] = [];

// const summarizedChanger = (res: BusstopPole) => {
//   const pos = res.position || [0, 0];
//   if (pos) {
//     let isPushed = false;
//     for (const summarised of summarisedBusstopPoles) {
//       const latDif = Math.abs(pos[0] - summarised.position[0]);
//       const lonDif = Math.abs(pos[1] - summarised.position[1]);
//       if (latDif < 0.001 && lonDif < 0.001) {
//         summarised.busstopPoles.push(res);
//         isPushed = true;
//         return;
//       }
//     };
//     if (!isPushed) summarisedBusstopPoles.push({
//       title: res.title,
//       position: res.position || [0, 0],
//       busstopPoles: [res],
//     });
//   }
// }

// busstopPoles.forEach((res) => {
//   summarizedChanger(res);
// });

// return (
//   <ul>
//     {summarisedBusstopPoles.map((res, index) => (
//       <li key={index}>
//         <h2>{res.title}</h2>
//         <p>{res.position?.join(' , ')}</p>
//         <ul>
//           {res.busstopPoles.map((busstopPole) => (
//             <li key={busstopPole.ID}>
//               {busstopPole.ID}
//             </li>
//           ))}
//         </ul>
//       </li>
//     ))}
//     {busstopPoles.length === 0 && <li>データがありません</li>}
//   </ul>
// )