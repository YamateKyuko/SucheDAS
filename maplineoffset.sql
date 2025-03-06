drop table if exists s.line;
create table s.line as
with paths as (
	select 
		sum(cnt.cnt) as sum,
		least(stp1.station_id, stp2.station_id),
		greatest(stp1.station_id, stp2.station_id),

		cnt.daytype,
		rot.route_name

	from daytype_cnt as cnt
	inner join routes as rot using(feed_id, route_id)
	inner join stop_patterns as spt using(pattern_id)
	inner join stops as stp1
		on spt.feed_id = stp1.feed_id and spt.stop_id = stp1.stop_id
	inner join stops as stp2
		on spt.feed_id = stp2.feed_id and spt.next_stop_id = stp2.stop_id
	where spt.next_stop_id is not null
	group by 2,3,4,5
),
grouped as (
		select 
		sum,
		daytype,
		route_name,
		least,
		greatest,
		row_number() over(
			partition by
				least,
				greatest,
				daytype
			order by 
				route_name
		) - 1 as num,
		count(*) over(
			partition by
				least,
				greatest,
				daytype
		) as cnt 
	from paths
)
select 
	ud_trns_line(
		sta1.station_geom,
		sta2.station_geom,
		((num - (cnt / 2)) * 0.0001)::real
	),
	grouped.*
from grouped
inner join parent_stations as sta1
	on least = sta1.station_id
inner join parent_stations as sta2
	on greatest = sta2.station_id
;