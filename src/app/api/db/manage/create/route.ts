import { NextResponse } from 'next/server';
// import { stopPatternsTable } from '@/app/api/db/sets/defines';
import { agencyTable, calendarTable, feedTable, routesTable, servicesTable, parentStationsTable, stopsTable, stopTimesTable, tripsTable, stopPatternsTable, tripPatternsTable } from '@/app/api/db/sets/defines';
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
    drop function if exists ud_to_second(varchar(8));
    create function
    ud_to_second(
      varchar(8)
    ) returns integer as $$
    SELECT (
      split_part($1, ':', 1)::smallint * 3600 +
      split_part($1, ':', 2)::smallint * 60 +
      split_part($1, ':', 3)::smallint 
    )::integer
    $$ language sql;
  `);

  await client.run(`
    drop function if exists ud_to_day(date);
    create function ud_to_day(date)
    returns varchar(3) as $$
      SELECT
        (array['日','月','火','水','木','金','土'])[EXTRACT(DOW FROM CAST($1 AS DATE)) + 1]
    $$ language sql;
  `);
  await client.run(`
    drop function if exists ud_is_holiday(date);
    create function ud_is_holiday(date) returns bool as $$
      select 
        holiday_name is not null
      from holidays
      where holiday_date = $1
      limit 1;
    $$ language sql;
  `);
  await client.run(`
    drop function if exists ud_to_daytype(date);
    create function ud_to_daytype(date) returns varchar(2) as $$
    select
      case ud_is_holiday($1)
        when true then '祝'
        else case ud_to_day($1) 
          when '日' then '日'
          when '土' then '土'
          else '平'
        end
      end;
    $$ language sql;
  `);

  // 重要
  // await client.run(`
  //   DROP TYPE IF EXISTS public.ud_01;
  //   CREATE TYPE public.ud_01 AS ENUM('0', '1');
  //   DROP TYPE IF EXISTS public.ud_02;
  //   CREATE TYPE public.ud_02 AS ENUM('0', '1', '2');
  //   DROP TYPE IF EXISTS public.ud_03;
  //   CREATE TYPE public.ud_03 AS ENUM('0', '1', '2', '3');
  //   DROP TYPE IF EXISTS public.ud_route_type;
  //   CREATE TYPE public.ud_route_type AS ENUM
  //     ('0', '1', '2', '3', '4', '5', '6', '7');
  // `);


  await feedTable(client).create();
  await agencyTable(client).create();
  await routesTable(client).create();
  await servicesTable(client).create();
  await calendarTable(client).create();
  await tripPatternsTable(client).create();
  await tripsTable(client).create();
  await parentStationsTable(client).create();
  await stopsTable(client).create();
  await stopTimesTable(client).create();
  await stopPatternsTable(client).create();

  await client.run(`
    grant select on all tables in schema public to reader;
  `);
};
