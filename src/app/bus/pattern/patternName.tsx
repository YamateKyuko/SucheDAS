import { getPatterns } from '@/app/lib/data';
import React from 'react'
import { Pattern } from '../ui/pattern';

export default async function PatternName(props: { id: number }) {
  const pattern = await getPatterns({pattern_id: props.id});
  
  if (!pattern || !pattern[0]) return <h1>系統が見つかりません</h1>;
  const route = pattern[0];
  return (
    <h1>
      <Pattern long={route.route_long_name} short={route.route_short_name} headsign={route.stop_headsign} pattern_id={route.pattern_id} />
    </h1>
  )
}