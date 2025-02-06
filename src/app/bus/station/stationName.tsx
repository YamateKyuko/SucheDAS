import { getStations } from '@/app/lib/data';
import React from 'react'
import { Place } from '../ui/place';

export default async function StationName(props: { id: number }) {
  const stations = await getStations({station_id: props.id});
  
  if (!stations || !stations[0]) return <h1>停留所が見つかりません</h1>;
  const station = stations[0];
  return (
    <h1>
      {station.station_name}
      <Place code={station.station_muni} town={station.station_town} />
    </h1>
  )
}