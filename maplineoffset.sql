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



drop function if exists ud_trns_line(geometry(Point, 3857), geometry(Point, 3857), real);
create function ud_trns_line(
	geom1 geometry(Point, 3857),
	geom2 geometry(Point, 3857),
	dist real
) returns geometry(Linestring, 3857) as
$$
with 
dgr as (select st_azimuth($1, $2) as d),
bol as (select case when (0 < d and d < 3.142) then 1 else -1 end as b from dgr),
xyl as (select (st_x($1) - st_x($2)) as xl, (st_y($1) - st_y($2)) as yl),
lza as (select (|/ ((xl ^ 2) + (yl ^ 2))) as l from xyl),
lng as (select case l when 0 then 1 else l end as l from lza)
select
	st_translate(
		st_makeline($1, $2),
		$3 * xyl.yl / lng.l * bol.b,
		$3 * xyl.xl / lng.l * -1 * bol.b
	)
from lng, xyl, bol
$$ language sql;








drop table if exists s.l;
create table s.l (
	pattern_id integer,
	path geometry(multilinestring, 3857)
);

do $$
declare
	l1 record;
	l2 record;
	l3 record;
	hoge geometry(multilinestring, 3857);
begin
	for l1 in (
		select 
			pattern_id,
			st_makeline(sta.station_geom order by stop_sequence) as path
		from stop_patterns
		inner join stops as stp
			using (feed_id, stop_id)
		inner join parent_stations as sta
			using(station_id)
		where route_name in ('武７１', '府７５')
		group by pattern_id
		limit 2
		
	) loop
		raise notice 'hej';

		for l2 in (
			select
				st_dump(
					st_split(
						l1.path,
						st_buffer(
							coalesce(
								st_collect(s.l.path),
								st_setsrid('multilinestring empty'::geometry, 3857)
							),
							0.001
						)
					)
				) as p
				from s.l
		) loop
			raise notice '%', st_astext(st_multi((l2.p).geom));
			if (
				select
				
			) then
				
			end if;
			select
				-- st_snap(
				-- 	(l2.p).geom,
				-- 	st_buffer(
				-- 		coalesce(
				-- 			(select st_collect(s.l.path) from s.l),
				-- 			st_setsrid('multilinestring empty'::geometry, 3857)
				-- 		),
				-- 		0.0001
				-- 	),
				-- 	1
				-- )
				st_multi((l2.p).geom)
				into hoge
				-- from s.l
				limit 1;
			raise notice '%', st_astext(hoge);
			insert into s.l values(l1.pattern_id, hoge);
			
		end loop;
		

		-- for l2 in (
		-- 	select
				
		-- 		from s.l
		-- ) loop
		-- end loop;
		
		-- select 
		-- 	st_difference(
		-- 		l1.path,
		-- 		st_buffer(
		-- 			coalesce(
		-- 				st_collect(s.l.path),
		-- 				st_setsrid('multilinestring empty'::geometry, 3857)
		-- 			),
		-- 			0.001
		-- 		)
		-- 	)
		-- 	from s.l
		-- 	into hoge;
		-- raise notice '%', st_astext(hoge);


		-- select st_snap(l1) into hoge;

		-- insert into s.l values(l1.pattern_id, hoge);
	end loop;
end;
$$;


select 
pattern_id,
path,
st_buffer(path, 0.0001)
from s.l;