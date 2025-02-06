import { getRTtripUpdatesRequestProvider, getRTvehiclePositionRequestProvider } from './RTproviderList';





type getContent = {
  type: 'req' | 'res', 
  status: 'ok' | 'fail',
};

export type getRequest = getContent & {
  from: `/bus/lib/request/${string}`,
  type: 'req',
};

export const isRequest = <T extends getRequest>(obj: unknown, from: T['from']): obj is T => {
  const bool = (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as {[k:string]: unknown}).from == from &&
    (obj as {[k:string]: unknown}).type == 'req' &&
    (obj as {[k:string]: unknown}).status == 'ok'
  );
  return bool;
};

export type getResponse = getContent & {
  endpoint: `/api/${string}/`,
  type: 'res',
};

export const isResponse = (obj: unknown, endpoint: string): boolean => {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as {[k:string]: unknown}).endpoint == endpoint &&
    (obj as {[k:string]: unknown}).type == 'res' &&
    (obj as {[k:string]: unknown}).status == 'ok'
  );
};

export type getFailResponse = (getResponse & {
  type: 'res',
  status: 'fail',
  error: string,
  code: number,
});

export const getGetFailResponse = (error: string, code: number): getFailResponse => {
  return {
    type: 'res',
    status: 'fail',
    endpoint: `/api/${error}/`,
    error,
    code,
  };
};

export interface getStationsRequest extends getRequest {
  from: '/bus/lib/request/stations/',
  where: getStationsReqStationName | getStationsReqStationId,
};
export interface getStationsReqStationName {station_name: string};
export interface getStationsReqStationId {station_id: number};

export interface getStationsResponse extends getResponse {
  endpoint: '/api/db/tables/stations/',
  station_id: number,
  station_name: string,
  station_muni: number | null,
  station_town: string | null,
};

export type getPlaceResponse = getResponse & {
  pref: string | null,
  city: string | null,
  block: string | null,
  geom: [number, number],
}; // not array

export type getMuniReturn = (getResponse & {
  pref: string | null,
  city: string | null,
  code: number
})[];

export interface getStopsReq extends getRequest {
  from: '/bus/lib/request/stops/',
  station_id: number,
};

export interface getStopsReturn extends getResponse {
  endpoint: '/api/db/tables/stops/',
  stop_id: string,
  stop_name: string,
  stop_geom: string,
  zone_id: string | null,
  platform_code: string | null,
};

export interface getPatternsReq extends getRequest {
  from: '/bus/lib/request/patterns/',
  where: getPatternsReqStationId | getPatternsReqPatternId,
};

export interface getPatternsReqStationId {station_id: number};
export interface getPatternsReqPatternId {pattern_id: number};

export interface getPatternsResponse extends getResponse {
  endpoint: '/api/db/tables/patterns/',
  feed_id: number,
  pattern_id: number,
  agency_id: string,
  route_id: string,
  route_long_name: string | null,
  route_short_name: string | null,
  direction_id: string | null,
  pattern_count: number,
  stop_name: string,
  stop_id: string,
  station_id: number,
  zone_id: string | null,
  stop_headsign: string | null,
  platform_code: string | null,
  stop_sequence: number,
};


export interface getRoutesRequest extends getRequest {
  from: '/bus/lib/request/routes/',
  where: getRoutesReqRouteId,
};
export interface getRoutesReqRouteId {route_id: string};

export interface getRoutesResponse extends getResponse {
  endpoint: '/api/db/tables/routes/',
  route_id: string,
  agency_id: string,
  route_short_name: string | null,
  route_long_name: string | null,
  route_type: string | null,
};

export interface getRTvehicleRequest extends getRequest {
  from: '/bus/lib/request/gtfsrt/vehicle/',
  provider: getRTvehiclePositionRequestProvider,
};


export interface getRTvehicleResponse extends getResponse {
  endpoint: '/api/others/gtfsrt/vehicle/',
  provider: getRTvehiclePositionRequestProvider,
  providerName: string,
  textColor: string,
  entities: [string, getRTvehicleResponseEntity][],
};

export interface getRTvehicleResponseEntity {
  id: string | null,
  isDeleted: boolean | null,

  // trip
  trip_id: string,
  schedule_relationship: 0 | 1 | 2 | 3 | 5 | 6 | 7 | null,

  // vehicle
  vehicle_id: string | null,
  vehicle_label: string | null,
  wheelchair_accessible: 0 | 1 | 2 | 3 | null,

  // position
  coordinates: [number, number] | null,
  bearing: number | null,
  speed: number | null,

  stop_sequence: number | null,
  stop_id: string | null,
  status: 0 | 1 | 2 | null,
  timestamp: number | null,

  description: string | null,
}

export interface getRTtripUpdatesRequest extends getRequest {
  from: '/bus/lib/request/gtfsrt/tripUpdates/',
  provider: getRTtripUpdatesRequestProvider
};

export interface getRTtripUpdatesResponse extends getResponse {
  endpoint: '/api/others/gtfsrt/tripUpdates/',
  entities: [string, getRTtripUpdatesResponseEntity][],
};

export interface getRTtripUpdatesResponseEntity {
  id: string | null,
  isDeleted: boolean | null,
  
  // trip
  trip_id: string,
  schedule_relationship: 0 | 1 | 2 | 3 | 5 | 6 | 7 | null,

  // vehicle
  vehicle_id: string | null,
  vehicle_label: string | null,
  wheelchair_accessible: 0 | 1 | 2 | 3 | null,

  // list
  stop_time_update_list: {[k: number]: getRTtripUpdatesResponseStopTimeUpdate},

  timestamp: number | null,
  delay: number | null,
}

export interface getRTtripUpdatesResponseStopTimeUpdate {
  stop_sequence: number,
  stop_id: string | null,
  arrival_delay: number | null,
  arrival_uncertainly: number | null,
  departure_delay: number | null,
  departure_uncertainly: number | null,
  schedule_relationship: 0 | 1 | 2 | 3 | 5 | 6 | 7 | null,
}