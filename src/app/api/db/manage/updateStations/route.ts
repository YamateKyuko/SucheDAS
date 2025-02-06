import { ManageDatabase, Transaction } from "../../sets/connection";
import { parentStationsTable } from "../../sets/defines";
import { authenticate } from "../auth";
import { NextResponse } from "next/server";
import { getPlace } from "./get";

export async function GET(request: Request) {
  return await authenticate(request, updateStations);
}

async function updateStations(): Promise<NextResponse> {
  const db = await ManageDatabase.init();
  
  try {
    const res = db.Transaction(updater);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { updateStations: '' },
      { status: 500 }
    );
  };
};

async function updater(client: Transaction) {
  const tbl = parentStationsTable(client);
  const rows = await tbl.selectAll(
    ['station_id as id', 'ST_X(station_geom) as lon', 'ST_Y(station_geom) as lat']
  );
  const responces: Promise<undefined | { station_muni: number, station_town: string, station_id: number }>[] = [];
  for (const row of rows) {
    await sleep(5);
    const {lon, lat, id} = row;
    console.log(id);
    responces.push(getPlace(lat, lon, id));
  };
  for (const res of responces) {
    const awaited = await res;
    if (awaited) {
      await tbl.update(
        {station_muni: awaited.station_muni, station_town: awaited.station_town},
        {station_id: awaited.station_id}
      );
      console.log(`awaited: ${awaited.station_id}`)
    };
  }
  return NextResponse.json({updateStations: 'updated'});
};


const sleep = (time: number) => new Promise<void>(resolve => setTimeout(() => resolve(), time))