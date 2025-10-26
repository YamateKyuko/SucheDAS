import { table } from "./operation";
import { Database, ManageDatabase, Transaction } from "./connection";

export function feedTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'feed',
    define: {
      feed_id: 'integer not null',
      feed_url: 'varchar(255) not null',
      feed_import: 'varchar(10) not null',
      // feed_import: 'date not null',
      feed_publisher_name: 'varchar(255) not null',
      feed_publisher_url: 'varchar(255) not null',
      feed_lang: 'varchar(15) not null',
      // feed_start_date: 'date',
      // feed_end_date: 'date',
      feed_version: 'varchar(63)',
    },
    constraint: `
      primary key (feed_id)
    `,
    query: `create index if not exists ix_feed_feed_id on feed(feed_id);`,
  }, client);
}

export function agencyTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'agency',
    define: {
      feed_id: 'smallint not null',
      agency_id: 'varchar(63)',
      agency_name: 'varchar(63) not null',
      agency_url: 'varchar(63) not null',
      agency_timezone: 'varchar(15) not null',
      agency_lang: 'varchar(15) not null',
      agency_phone: 'varchar(31)',
      agency_fare_url: 'varchar(255)',
      agency_email: 'varchar(255)',

      agency_official_name: 'varchar(255)',
      agency_zip_number: 'varchar(15)',
      agency_address: 'varchar(255)',
      agency_president_pos: 'varchar(63)',
      agency_president_name: 'varchar(63)',
    },
    constraint: `
      primary key (agency_id),
      constraint fk_agency_feed_id foreign key (feed_id) references feed(feed_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_agency_agency_id on agency(feed_id, agency_id);`,
  }, client);
};

export function routesTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'routes',
    define: {
      feed_id: 'smallint not null',
      route_id: 'varchar(63) not null',
      agency_id: 'varchar(63) not null',
      route_name: 'varchar(255)',
      route_short_name: 'varchar(63)',
      route_long_name: 'varchar(255)',
      route_desc: 'varchar(255)',
      route_type: 'integer check (route_type in (0, 1, 2, 3, 4, 5, 6, 7))',
      route_url: 'varchar(255)',
      route_color: 'varchar(6)',
      route_text_color: 'varchar(6)',
      route_sort_order: 'integer',
      jp_parent_route_id: 'varchar(63)',
    },
    constraint: `
      primary key (feed_id, route_id),
      constraint fk_routes_feed_id foreign key (feed_id) references feed(feed_id) on delete cascade on update cascade,
      constraint fk_routes_agency_id foreign key (agency_id) references agency(agency_id) on delete cascade on update cascade,
      constraint ch_routes_short_long_name check ((route_short_name=null and route_long_name!=null) or (route_short_name!=null and route_long_name=null) or (route_short_name!=null and route_long_name!=null))
    `,
    query: `create index if not exists ix_routes_route_id on routes(feed_id, route_id);`,
  }, client);
};

export function servicesTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'services',
    define: {
      feed_id: 'smallint not null',
      // monday: 'ud_01',
      // tuesday: 'ud_01',
      // wednesday: 'ud_01',
      // thursday: 'ud_01',
      // friday: 'ud_01',
      // saturday: 'ud_01',
      // sunday: 'ud_01',
      // start_date: 'date',
      // end_date: 'date',
      service_id: 'varchar(63)',
    },
    constraint: `
      primary key (feed_id, service_id),
      constraint fk_services_feed_id foreign key (feed_id) references feed(feed_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_services_service_id on services(feed_id, service_id);`,
  }, client);
};

export function calendarTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'calendar',
    define: {
      feed_id: 'smallint not null',
      service_id: 'varchar(63) not null',
      date: 'varchar(10) not null',
      // date: 'date not null',
    },
    constraint: `
      primary key (feed_id, service_id, date),
      constraint fk_calendar_service_id foreign key (feed_id, service_id) references services(feed_id, service_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_calendar_service_id on calendar(feed_id, service_id);`,
  }, client);
};

export function tripPatternsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'trip_patterns',
    define: {
      feed_id: 'smallint not null',
      pattern_id: 'integer not null',
      route_type: 'integer check (route_type in (0, 1, 2, 3, 4, 5, 6, 7)) not null',
      route_id: 'varchar(63)',
      agency_id: 'varchar(63)',
      direction_id: 'integer check (direction_id in (0, 1))',
      route_name: 'varchar(255) not null',
      // stop_list: 'varchar(255)[]',
      // headsign_list: 'varchar(255)[]',
    },
    constraint: `
      primary key (pattern_id)
    `,
    query: `create index if not exists ix_trip_patterns_pattern_id on trip_patterns(pattern_id);`,
  }, client);
};

export function tripsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'trips',
    define: {
      feed_id: 'smallint not null',
      trip_id: 'varchar(63)',
      route_id: 'varchar(63) not null',
      service_id: 'varchar(63) not null',
      trip_headsign: 'varchar(255)',
      trip_short_name: 'varchar(63)',
      direction_id: 'integer check (direction_id in (0, 1))',
      block_id: 'varchar(63)',
      shape_id: 'varchar(63)',
      wheelchair_accessible: 'integer check (wheelchair_accessible in (0, 1, 2))',
      bikes_allowed: 'integer check (bikes_allowed in (0, 1, 2))',
      jp_trip_desc: 'varchar(255)',
      jp_trip_desc_symbol: 'varchar(255)',
      jp_office_id: 'varchar(63)',
      jp_trip_desc_detail: 'varchar(255)',

      pattern_id: 'integer',
    },
    constraint: `
      primary key (feed_id, trip_id),
      constraint fk_trips_route_id foreign key (feed_id, route_id) references routes(feed_id, route_id) on delete cascade on update cascade,
      constraint fk_trips_service_id foreign key (feed_id, service_id) references services(feed_id, service_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_trips_trip_id on trips(feed_id, trip_id);`,
  }, client);
};

export function parentStationsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'parent_stations',
    define: {
      station_id: 'integer not null',
      station_name: 'varchar(255) not null',
      station_muni: 'integer',
      station_town: 'varchar(255)',
      station_lat: 'double precision',
      station_lon: 'double precision',
      // station_geom: 'geometry(Point, 3857) not null', // 
    },
    constraint: `
      primary key (station_id)
    `,
    query: `create index if not exists ix_parent_stations_station_id on parent_stations(station_id);`,
  }, client);
}

export function stopsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'stops',
    define: {
      feed_id: 'smallint not null',
      stop_id: 'varchar(63) not null',
      stop_code: 'varchar(255)',
      stop_name: 'varchar(63) not null',
      stop_desc: 'varchar(255)',
      stop_lat: 'double precision',
      stop_lon: 'double precision',
      // stop_geom: 'geometry(Point, 3857) not null',
      zone_id: 'varchar(63)',
      stop_url: 'varchar(255)',
      location_type: 'integer check (location_type in (0, 1))',
      station_id: 'integer',
      parent_station: 'varchar(255)',
      stop_timezone: 'varchar(15)',
      wheelchair_boarding: 'integer check (wheelchair_boarding in (0, 1, 2))',
      platform_code: 'varchar(255)',
    },
    constraint: `
      -- constraint fk_stops_station_id foreign key (station_id) references parent_stations(station_id) on delete cascade on update cascade,

      primary key (feed_id, stop_id),
      constraint fk_stops_feed_id foreign key (feed_id) references feed(feed_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_stops_stop_id on stops(feed_id, stop_id);`,
    placeHolders: {
      // stop_geom: (num: number): `ST_GeomFromText($${number}, 3857)` => `ST_GeomFromText($${num}, 3857)`,
      // station_id: (num1: number, num2: number): `ud_getStationID($${number}, ST_GeomFromText($${number}, 3857))` => `ud_getStationID($${num1}, ST_GeomFromText($${num2}, 3857))`,
    },
  }, client);
}

export function stopTimesTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'stop_times',
    define: {
      feed_id: 'smallint not null',
      trip_id: 'varchar(63)',
      arrival_time: 'integer not null',
      departure_time: 'integer not null',
      // arrival_time: 'varchar(8) not null',
      // departure_time: 'varchar(8) not null',
      stop_id: 'varchar(63) not null',
      stop_sequence: 'integer',

      stop_headsign: 'varchar(63)',
      pickup_type: 'integer check (pickup_type in (0, 1, 2, 3))',
      drop_off_type: 'integer check (drop_off_type in (0, 1, 2, 3))',
      shape_dist_traveled: 'varchar(255)',
    },
    constraint: `
      primary key (feed_id, trip_id, stop_sequence),
      constraint fk_stop_times_trip_id foreign key (feed_id, trip_id) references trips(feed_id, trip_id) on delete cascade on update cascade,
      constraint fk_stop_times_stop_id foreign key (feed_id, stop_id) references stops(feed_id, stop_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_stop_times_trip_id on stop_times(feed_id, trip_id);`,
    // placeHolders: {
    //   arrival_time: (num: number): `ud_to_second($${number})` => `ud_to_second($${num})`,
    //   departure_time: (num: number): `ud_to_second($${number})` => `ud_to_second($${num})`,
    // }
  }, client);
};

export function stopPatternsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'stop_patterns',
    define: {
      feed_id: 'smallint not null',
      pattern_id: 'integer not null',
      agency_id: 'varchar(63) not null',
      route_type: 'integer check (route_type in (0, 1, 2, 3, 4, 5, 6, 7))',
      route_id: 'varchar(63) not null',
      stop_headsign: 'varchar(63)',
      direction_id: 'integer check (direction_id in (0, 1))',
      route_name: 'varchar(255) not null',
      stop_id: 'varchar(63) not null',
      next_stop_id: 'varchar(63)',
      stop_sequence: 'integer not null',
      stop_name: 'varchar(63) not null',
      platform_code: 'varchar(255)',
      zone_id: 'varchar(63)',
      duration_time: 'integer',
    },
    constraint: `
      primary key (pattern_id, stop_sequence)
    `,
    query: `create index if not exists ix_stop_patterns_stop_sequence on stop_patterns(pattern_id, stop_sequence);`,
  }, client);
};







// SELECT
// 	pgn.nspname,
// 	relname,
// 	pg_size_pretty(relpages::bigint * 8 * 1024) AS size,
// 	CASE 
// 		WHEN relkind = 't'
// 			THEN (SELECT pgd.relname FROM pg_class pgd WHERE pgd.reltoastrelid = pg.oid) 
// 		WHEN nspname = 'pg_toast' AND relkind = 'i'
// 			THEN (SELECT pgt.relname FROM pg_class pgt WHERE SUBSTRING(pgt.relname FROM 10) = REPLACE(SUBSTRING(pg.relname FROM 10), '_index', ''))
// 		ELSE (SELECT pgc.relname FROM pg_class pgc WHERE pg.reltoastrelid = pgc.oid) END::varchar AS refrelname,
// 	CASE
// 		WHEN nspname = 'pg_toast' AND relkind = 'i'
// 			THEN (SELECT pgts.relname FROM pg_class pgts WHERE pgts.reltoastrelid = (SELECT pgt.oid FROM pg_class pgt WHERE SUBSTRING(pgt.relname FROM 10) = REPLACE(SUBSTRING(pg.relname FROM 10), '_index', ''))) END AS relidxrefrelname, 
// 	relfilenode,
// 	relkind,
// 	reltuples::bigint,
// 	relpages 
// FROM pg_class pg, pg_namespace pgn
// WHERE pg.relnamespace = pgn.oid AND pgn.nspname NOT IN 
// ('information_schema', 'pg_catalog') ORDER BY relpages DESC;