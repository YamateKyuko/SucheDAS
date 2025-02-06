export type gtfsrt = {
  gtfsRealtimeVersion: string,
  timestamp: number,
  entities: entity[]
}

export type entity = {
  id: string,
  isDeleted: boolean,

  // trip
  trip_id: string,
  schedule_relationship: 0 | 1 | 2 | 3,

  // vehicle
  vehicle_id: string,
  vehicle_label: string,
  wheelchair_accessible: 0 | 1 | 2,

  // position
  coordinates: [number, number],
  bearing: number,
  speed: number,

  stop_sequence: number,
  stop_id: string,
  status: 0 | 1 | 2 ,
  timestamp: number,
}