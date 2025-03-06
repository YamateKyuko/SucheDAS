drop table if exists daytype_cnt;
create table daytype_cnt (
	feed_id integer not null,
	route_id varchar(255) not null,
	pattern_id integer not null,
	daytype varchar(2),
	cnt integer not null
);

insert into daytype_cnt (
	feed_id,
	route_id,
	pattern_id,
	daytype,
	cnt
)
with by_day as (
	select
		feed_id,
		pattern_id,
		route_id,
		date,
		count(*) as day_cnt,
		ud_to_day(date) as dow,
		ud_to_daytype(date) as dty
	from trips
	inner join calendar as cal
		using (feed_id, service_id)
	group by
		feed_id,
		route_id,
		pattern_id,
		date
	order by
		feed_id,
		pattern_id,
		date
),
by_dty as (
	select
		feed_id,
		route_id,
		pattern_id,
		dty as daytype,
		mode() within group (
			order by day_cnt) as cnt
	from by_day
	group by
		feed_id,
		route_id,
		pattern_id,
		dty
)
select * from by_dty;
