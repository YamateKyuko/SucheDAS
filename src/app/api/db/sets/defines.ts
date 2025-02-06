import { table } from "./operation";
import { Database, ManageDatabase, Transaction } from "./connection";

export function feedTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'feed',
    define: {
      feed_id: 'integer generated always as identity',
      feed_url: 'varchar(255) not null',
      feed_import: 'date not null',
      feed_publisher_name: 'varchar(255) not null',
      feed_publisher_url: 'varchar(255) not null',
      feed_lang: 'varchar(15) not null',
      feed_start_date: 'date',
      feed_end_date: 'date',
      feed_version: 'varchar(63)',
    },
    constraint: `
      primary key (feed_id)
    `,
    query: `create index if not exists ix_feed_feed_id on feed(feed_id);`,
    // placeHolders: { feed_id: (): 'default' => 'default' },
  }, client);
}

export function agencyTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'agency',
    define: {
      feed_id: 'integer not null',
      agency_id: 'varchar(255)',
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
      feed_id: 'integer',
      route_id: 'varchar(255) not null',
      agency_id: 'varchar(255) not null',
      route_short_name: 'varchar(63)',
      route_long_name: 'varchar(255)',
      route_desc: 'varchar(255)',
      route_type: 'ud_route_type',
      route_url: 'varchar(255)',
      route_color: 'varchar(6)',
      route_text_color: 'varchar(6)',
      route_sort_order: 'integer',
      jp_parent_route_id: 'varchar(255)',
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
      feed_id: 'integer',
      service_id: 'varchar(255)',
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
      feed_id: 'integer not null',
      service_id: 'varchar(255) not null',
      date: 'date not null',
    },
    constraint: `
      primary key (feed_id, service_id, date),
      constraint fk_calendar_service_id foreign key (feed_id, service_id) references services(feed_id, service_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_calendar_service_id on calendar(feed_id, service_id);`,
  }, client);
};

export function tripsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'trips',
    define: {
      feed_id: 'integer',
      trip_id: 'varchar(255)',
      route_id: 'varchar(255) not null',
      service_id: 'varchar(255) not null',
      trip_headsign: 'varchar(255)',
      trip_short_name: 'varchar(63)',
      direction_id: 'ud_01',
      block_id: 'varchar(255)',
      shape_id: 'varchar(255)',
      wheelchair_accessible: 'ud_02',
      bikes_allowed: 'ud_02',
      jp_trip_desc: 'varchar(255)',
      jp_trip_desc_symbol: 'varchar(255)',
      jp_office_id: 'varchar(255)',
      jp_trip_desc_detail: 'varchar(255)',
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
      station_id: 'integer generated always as identity',
      station_name: 'varchar(255) not null',
      station_muni: 'integer',
      station_town: 'varchar(255)',
      station_geom: 'geometry(Point, 3857) not null',
      station_bbox: 'geometry(Linestring, 3857) not null',
    },
    constraint: `
      primary key (station_id)
    `,
    // query: `create index if not exists ix_parent_stations_station_id on parent_stations(feed_id, station_id);`,
    // placeHolders: { station_bbox: (num: number): `ST_GeomFromText($${number}, 3857)` => `ST_GeomFromText($${num}, 3857)` },
  }, client);
}

export function stopsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'stops',
    define: {
      feed_id: 'integer',
      stop_id: 'varchar(255) not null',
      stop_code: 'varchar(255)',
      stop_name: 'varchar(63) not null',
      stop_desc: 'varchar(255)',
      stop_geom: 'geometry(Point, 3857) not null',
      zone_id: 'varchar(255)',
      stop_url: 'varchar(255)',
      location_type: 'ud_01',
      station_id: ['ud', 'integer'],
      parent_station: 'varchar(255)',
      stop_timezone: 'varchar(15)',
      wheelchair_boarding: 'ud_02',
      platform_code: 'varchar(255)',
    },
    constraint: `
      constraint fk_stops_station_id foreign key (station_id) references parent_stations(station_id) on delete cascade on update cascade,

      primary key (feed_id, stop_id),
      constraint fk_stops_feed_id foreign key (feed_id) references feed(feed_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_stops_stop_id on stops(feed_id, stop_id);`,
    placeHolders: {
      stop_geom: (num: number): `ST_GeomFromText($${number}, 3857)` => `ST_GeomFromText($${num}, 3857)`,
      station_id: (num1: number, num2: number): `ud_getStationID($${number}, ST_GeomFromText($${number}, 3857))` => `ud_getStationID($${num1}, ST_GeomFromText($${num2}, 3857))`,
    },
  }, client);
}

export function stopTimesTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'stop_times',
    define: {
      feed_id: 'integer',
      trip_id: 'varchar(255)',
      arrival_time: 'varchar(8) not null',
      departure_time: 'varchar(8) not null',
      stop_id: 'varchar(255) not null',
      stop_sequence: 'integer',
      stop_headsign: 'varchar(63)',
      pickup_type: 'ud_03',
      drop_off_type: 'ud_03',
      shape_dist_traveled: 'varchar(255)',
    },
    constraint: `
      primary key (feed_id, trip_id, stop_sequence),
      constraint fk_stop_times_trip_id foreign key (feed_id, trip_id) references trips(feed_id, trip_id) on delete cascade on update cascade,
      constraint fk_stop_times_stop_id foreign key (feed_id, stop_id) references stops(feed_id, stop_id) on delete cascade on update cascade
    `,
    query: `create index if not exists ix_stop_times_trip_id on stop_times(feed_id, trip_id);`,
  }, client);
};

export function stopPatternsTable(client: Database | ManageDatabase | Transaction) {
  return new table({
    name: 'stop_patterns',
    define: {
      feed_id: 'integer not null',
      pattern_id: 'integer not null',
      agency_id: 'varchar(255) not null',
      route_type: 'ud_route_type',
      route_id: 'varchar(255) not null',
      stop_headsign: 'varchar(63)',
      direction_id: 'ud_01',
      route_short_name: 'varchar(63)',
      route_long_name: 'varchar(255)',
      stop_id: 'varchar(255) not null',
      stop_sequence: 'integer not null',
      station_id: 'integer not null',
      stop_name: 'varchar(63) not null',
      platform_code: 'varchar(255)',
      zone_id: 'varchar(255)',
      pattern_count: 'integer not null',
    },
    constraint: `
      primary key (feed_id, pattern_id, stop_sequence)
    `,
    query: `create index if not exists ix_stop_patterns_pattern_id on stop_patterns(feed_id, pattern_id);`,
  }, client);
};