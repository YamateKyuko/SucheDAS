drop table if exists s.l;
create table s.l (
		path geometry(multilinestring, 3857)
);

do $$
declare
	pth record;
	hoge geometry(multilinestring, 3857);
begin
	for pth in (
		select 
			pattern_id,
			st_makeline(sta.station_geom order by stop_sequence) as path
		from stop_patterns
		inner join stops as stp
			using (feed_id, stop_id)
		inner join parent_stations as sta
			using(station_id)
		group by pattern_id
		limit 100
	) loop
		raise notice 'hej';
		select 
			st_difference(pth.path, coalesce(s.l.path, st_setsrid('multilinestring empty'::geometry, 3857)))
			from s.l
			into hoge;
		raise notice '%', st_astext(hoge);

		insert into s.l values(hoge);
	end loop;
end;
$$;