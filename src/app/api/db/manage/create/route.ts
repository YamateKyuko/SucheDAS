import { NextResponse } from 'next/server';
import { stopPatternsTable } from '@/app/api/db/sets/defines';
// import { agencyTable, calendarTable, feedTable, routesTable, servicesTable, parentStationsTable, stopsTable, stopTimesTable, tripsTable, stopPatternsTable } from '@/app/api/db/sets/defines';
import { ManageDatabase, Transaction } from '@/app/api/db/sets/connection';
import { authenticate } from '../auth';

export async function GET(request: Request) {
  return await authenticate(request, createDB);
};

async function createDB() {
  try {
    const db = await ManageDatabase.init();
    await db.Transaction(creater);
    return NextResponse.json(
      { createDB: 'created' },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { createDB: '' },
      { status: 500 }
    );
  };
}

async function creater(client: Transaction) {
  await client.run(`
    grant select on all tables in schema public to reader;
  `);
  await client.run(`
    
    drop function if exists ud_getStationID(varchar(255), geometry('Point', 3857));
    create function
    ud_getStationID(
      varchar(255),
      geometry('Point', 3857)
    ) returns integer as $$
      merge 
        into parent_stations as t
        using (values($1, $2)) as s(str, point)
          on 
            s.str = t.station_name and
            ST_DWithin(s.point, t.station_bbox, 0.01) -- 1km
        when matched then
          update
            set (
              station_geom,
              station_bbox
            ) = (
              select
                ST_LineInterpolatePoint(diag, 0.5),
                diag
              from ST_BoundingDiagonal(ST_Collect(s.point, t.station_bbox)) as diag
            )
        when not matched then
          insert (
              station_name,
              station_geom,
              station_bbox
            )
            values (
              s.str,
              ST_LineInterpolatePoint(ST_BoundingDiagonal(s.point), 0.5),
              ST_BoundingDiagonal(s.point)
            )
        returning t.station_id
      ;
    $$ language sql;
  `);
  // await client.query(`
  //   -- create extension if not exists postgis;
  //   drop type if exists ud_01 cascade;
  //   create type ud_01 as enum ('0', '1');
  //   drop type if exists ud_012 cascade;
  //   create type ud_02 as enum ('0', '1', '2');
  //   drop type if exists ud_0123 cascade;
  //   create type ud_03 as enum ('0', '1', '2', '3');
  //   drop type if exists ud_route_type cascade;
  //   create type ud_route_type as enum ('0', '1', '2', '3', '4', '5', '6', '7');
  // `);





  // await feedTable(client).create();
  // await agencyTable(client).create();
  // await routesTable(client).create();
  // await servicesTable(client).create();
  // await calendarTable(client).create();
  // await tripsTable(client).create();
  // await parentStationsTable(client).create();
  // await stopsTable(client).create();
  // await stopTimesTable(client).create();
  await stopPatternsTable(client).create();
};
