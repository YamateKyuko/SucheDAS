import { NextResponse } from "next/server";
import { authenticate } from "../auth";
import { ManageDatabase } from "../../sets/connection";



export async function GET(request: Request) {
  return await authenticate(request, insertPatterns);
}

async function insertPatterns(): Promise<NextResponse> {
  const db = await ManageDatabase.init();
  
  try {
    await db.run(query);
    return NextResponse.json({ insertPatterns: 'inserted' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { insertPatterns: 'error' },
      { status: 500 }
    );
  };
};


const query = `
insert into stop_patterns (
	feed_id,
	pattern_id,
	agency_id,
	route_type,
	route_id,
	direction_id,
  stop_headsign,
	route_short_name,
	route_long_name,
	stop_id,
	stop_sequence,
	station_id,
	stop_name,
	platform_code,
	zone_id,
	pattern_count
)
with distinct_stop_patterns as (
	select
		distinct on (
			array_agg(tim.stop_id order by tim.stop_sequence),
			array_agg(tim.stop_headsign order by tim.stop_sequence)
		)
		count(*) as cnt,
		tim.feed_id,
		tim.trip_id,
		trp.route_id,
		trp.direction_id
	from stop_times as tim
	inner join trips as trp using (feed_id, trip_id)
	group by
		tim.feed_id,
		tim.trip_id,
		trp.route_id,
		trp.direction_id
),
stop_patterns_count as (
	select
		*,
		row_number() over() as pattern_id
	from distinct_stop_patterns
)
select
	dis.feed_id,
	dis.pattern_id,
	rot.agency_id,
	rot.route_type,
	dis.route_id,
	dis.direction_id,
	tim.stop_headsign,
	rot.route_short_name,
	rot.route_long_name,
	tim.stop_id,
	tim.stop_sequence,
	stp.station_id,
	stp.stop_name,
	stp.platform_code,
	stp.zone_id,
	dis.cnt
from stop_patterns_count as dis
inner join stop_times as tim
	using(feed_id, trip_id)
inner join routes as rot
	using(feed_id, route_id)
inner join stops as stp
	using(feed_id, stop_id)
order by
	dis.route_id,
	dis.direction_id,
	dis.trip_id,
	tim.stop_sequence
;
`;