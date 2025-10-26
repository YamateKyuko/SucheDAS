import { NextResponse } from 'next/server';
import { agencyTable, calendarTable, feedTable, routesTable, servicesTable, stopsTable, stopTimesTable, tripsTable } from '@/app/api/db/sets/defines';
import { authenticate, queryParam } from '../auth';
import { gtfsReader } from './get';
import { ManageDatabase, Transaction } from '../../sets/connection';

type temp_fileData = {
  name: string,
  value: ParsedData[],
}
interface ParsedData {
  [key: string]: string | undefined;
}
// const needfiles: ([string] | [string, string])[] = [['agency', 'agency_jp'], ['routes']];
const needfiles: ([string] | [string, string])[] = [['agency', 'agency_jp'], ['routes'], ['calendar', 'calendar_dates'], ['trips'], ['stops'], ['stop_times']];
export async function GET(request: Request) {
  return authenticate(request, insertGTFS);
};

async function insertGTFS(params: queryParam): Promise<NextResponse> {
  try {
    const db = await ManageDatabase.init();
    
    const { url: feedUrl, date = '', feed_id: feedId } = params;
    if (!feedUrl) return missingError('feedUrl');
    if (!feedId) return missingError('feedId');

    const reader = await gtfsReader.init(feedUrl, date);

    if (!reader) return missingError('reader');

    const str = await db.Transaction(inserter, feedUrl, reader, Number(feedId));
    console.log(str);

    return NextResponse.json(str);

    // console.log('Loading: release');
    console.log('Loading: done');
    // return NextResponse.json({ insertGTFS: 'inserted' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { insertGTFS: 'error' },
      { status: 500 }
    );
  };
};

async function inserter(transaction: Transaction, feedUrl: string, reader: gtfsReader, feedId: number) {


  const feedData = await getFileData(reader, ['feed_info']);
  // const feedId = 
  await feed(transaction, feedData, feedUrl, feedId);
  // if (!feedId) return missingError('feedId');


  for (const fileNames of needfiles) {
    const fileSet = await getFileData(reader, fileNames);
    console.log('Load: ' + fileSet[0]?.name);
    switch (fileSet[0]?.name) {
      // case 'translations':
      //   await translations(transaction, fileSet, feedId);
      //   break;
      case 'agency':
        await agency(transaction, fileSet, feedId);
        break;
      case 'routes':
        await routes(transaction, fileSet, feedId);
        break;
      case 'calendar':
        await calendar(transaction, fileSet, feedId);
        break;
      case 'trips':
        await trips(transaction, fileSet, feedId);
        break;
      case 'stops':
        await stops(transaction, fileSet, feedId);
        break;
      case 'stop_times':
        await stop_times(transaction, fileSet, feedId);
        break;
      default:
        console.log('Unset: ' + fileSet[0]?.name);
        break;
    };
  };
  // console.log('Loading: release');
  // console.log('Loading: done');
  return transaction.queryStore;
  // return NextResponse.json({ insertGTFS: 'inserted' });
}

async function getFileData(reader: gtfsReader, fileName: [string] | [string, string]): Promise<temp_fileData[]> {
  return reader.get(fileName);
};

// async function translations(client: Transaction, files: temp_fileData[], feedId: number) {

//   const translationsValue = files[0]?.value || [];

//   const obj = {
//     stop_name: {
//       field_name: new Map<string, {val: string, lang: string}>(),
//       field_value: new Map<string, {val: string, lang: string}>(),
//     }
//   }

//   for (const translation of translationsValue) {
//     switch (translation.table_name) {
//       case 'stops':
//         const isRecord = !!translation.record_id;
//         if (translation.field_name != 'stop_name') break;
        
//     }
//   };
// };

async function feed(client: Transaction, files: temp_fileData[], feedUrl: string, feed_id: number): Promise<number | undefined> {
  const tbl = feedTable(client);
  const feedValue = files[0]?.value[0];
  if (!feedValue) return undefined;

  console.log('Loading: feed');
  console.log('  : ' + feedValue.feed_publisher_name);
  let able = true;
  const a = () => able = false;
  const insertData: NeededParams<typeof tbl['insert']> = {
    feed_id: feed_id, // dummy
    feed_import: new Date().toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-'),
    feed_url: feedUrl,
    feed_publisher_name: toStr(feedValue.feed_publisher_name, a),
    feed_publisher_url: toStr(feedValue.feed_publisher_url, a),
    feed_lang: toStr(feedValue.feed_lang, a),
    // feed_start_date: Iso(feedValue.feed_start_date),
    // feed_end_date: Iso(feedValue.feed_end_date),
    feed_version: Str(feedValue.feed_version),
  };
  // const insertQuery = `returning feed_id`;
  if (able) {
    await tbl.insert(insertData);
    // const res = await tbl.returningInsert(insertData, ['feed_id'], 'overriding user value');
    // if (!res) return undefined;
    // const feed_id = res.feed_id;
    // if (isNum(feed_id)) return feed_id;
    // else return undefined;
  }
  else console.log('--> Error: required data is missing.'); return undefined;
}

async function agency(client: Transaction, files: temp_fileData[], feedId: number) {
  const tbl = agencyTable(client);
  const agencyValue = files[0]?.value || [];
  const agency_jpValue = files[1]?.value || [];
  if (!agencyValue.length) return;
  console.log('Loading: agency' + (agency_jpValue.length ? ', agency_jp' : ''));
  for (const agency of agencyValue) {
    console.log('  : ' + agency.agency_name);
    let able = true;
    const a = () => able = false;
    const agency_jp = files[1]?.value.find((jp) => jp.agency_id == agency.agency_id) || undefined;
    const insertData: NeededParams<typeof tbl['insert']> = {
      feed_id: feedId,
      agency_id: toStr(agency.agency_id, a),
      agency_name: toStr(agency.agency_name, a),
      agency_url: toStr(agency.agency_url, a),
      agency_timezone: toStr(agency.agency_timezone, a),
      agency_lang: toStr(agency.agency_lang, a),
      agency_phone: Str(agency.agency_phone),
      agency_fare_url: Str(agency.agency_fare_url),
      agency_email: Str(agency.agency_email),

      agency_official_name: Str(agency_jp?.agency_official_name),
      agency_zip_number: Str(agency_jp?.agency_zip_number),
      agency_address: Str(agency_jp?.agency_address),
      agency_president_pos: Str(agency_jp?.agency_president_pos),
      agency_president_name: Str(agency_jp?.agency_president_name),
    };
    if (able) {await tbl.insert(insertData)}
    else console.log('--> Error: required data is missing.');
  };
};

async function routes(client: Transaction, files: temp_fileData[], feedId: number) {
  const tbl = routesTable(client);
  const routesValue = files[0]?.value || [];
  if (!routesValue.length) return;
  console.log('Loading: routes');
  for (const route of routesValue) {
    const route_name = route.route_short_name || route.route_long_name || route.route_id || '';
    console.log('  : ' + route_name);
    let able = true;
    const a = () => able = false;
    const insertData: NeededParams<typeof tbl['insert']> = {
      feed_id: feedId,
      route_id: toStr(route.route_id, a),
      agency_id: toStr(route.agency_id, a),
      route_name: route_name,
      route_short_name: Str(route.route_short_name),
      route_long_name: Str(route.route_long_name),
      route_desc: Str(route.route_desc),
      route_type: Num(route.route_type),
      route_url: Str(route.route_url),
      route_color: Str(route.route_color),
      route_text_color: Str(route.route_text_color),
      route_sort_order: Num(route.route_sort_order),
      jp_parent_route_id: Str(route.jp_parent_route_id),
    };
    if (able) {await tbl.insert(insertData)}
    else console.log('--> Error: required data is missing.');
  };
};

async function calendar(client: Transaction, files: temp_fileData[], feedId: number) {
  const servicesTbl = servicesTable(client);
  const calendarTbl = calendarTable(client);
  const services = new Map<string, Set<string>>();
  const calendars = files[0]?.value || [];
  const calendarDates = files[1]?.value || [];
  if (calendars.length) console.log('Loading: calendar');
  calendars.forEach(async (calendar) => {
    console.log('  : ' + calendar.service_id);
    const serviceID = calendar.service_id;
    if (!serviceID) return;
    const startDate = new Date(Iso(calendar.start_date) || '');
    const endDate = new Date(Iso(calendar.end_date) || '');
    const days = [
      calendar.sunday == '1',
      calendar.monday == '1',
      calendar.tuesday == '1',
      calendar.wednesday == '1',
      calendar.thursday == '1',
      calendar.friday == '1',
      calendar.saturday == '1'
    ];
    while (startDate <= endDate) {
      if (days[startDate.getDay()]) {
        if (!services.has(serviceID)) {
          services.set(serviceID, new Set());
        }
        services.get(serviceID)!.add(startDate.toISOString().split('T')[0] as string);
      }
      startDate.setDate(startDate.getDate() + 1);
    }
  });
  if (calendarDates.length) console.log('Loading: calendar_dates');
  calendarDates.forEach(async (calendarDate) => {
    console.log('  : ' + calendarDate.service_id);
    const serviceID = calendarDate.service_id;
    const date = new Date(Iso(calendarDate.date) || '');
    if (!serviceID || !date) return;
    if (calendarDate.exception_type == '1') {
      if (!services.has(serviceID)) {
        services.set(serviceID, new Set());
      }
      services.get(serviceID)!.add(date.toISOString().split('T')[0] as string);
    } else if (calendarDate.exception_type == '2') {
      if (!services.has(serviceID)) {
        services.set(serviceID, new Set());
      }
      services.get(serviceID)?.delete(date.toISOString().split('T')[0] as string);
    }
  });
  for (const [serviceID, dates] of services) {
    await servicesTbl.insert({
      feed_id: feedId,
      service_id: serviceID,
    });
    for (const date of dates) {
      await calendarTbl.insert({
        feed_id: feedId,
        service_id: serviceID,
        date: date,
      });
    };
  };
};

async function trips (client: Transaction, files: temp_fileData[], feedId: number) {
  const tbl = tripsTable(client);
  const trips = files[0]?.value || [];
  if (!trips.length) return;
  console.log('Loading: trips');
  for (const trip of trips) {
    console.log('  : ' + trip.trip_id);
    let able = true;
    const a = () => able = false;
    const insertData: NeededParams<typeof tbl['insert']> = {
      feed_id: feedId,
      route_id: toStr(trip.route_id, a),
      service_id: toStr(trip.service_id, a),
      trip_id: toStr(trip.trip_id, a),
      trip_headsign: Str(trip.trip_headsign),
      trip_short_name: Str(trip.trip_short_name),
      direction_id: Num(trip.direction_id),
      block_id: Str(trip.block_id),
      shape_id: Str(trip.shape_id),
      wheelchair_accessible: Num(trip.wheelchair_accessible),
      bikes_allowed: Num(trip.bikes_allowed),
      jp_trip_desc: Str(trip.jp_trip_desc),
      jp_trip_desc_symbol: Str(trip.jp_trip_desc_symbol),
      jp_office_id: Str(trip.jp_office_id),
      jp_trip_desc_detail: Str(trip.jp_trip_desc_detail),

      pattern_id: null,
    };
    if (able) {await tbl.insert(insertData)}
    else console.log('--> Error: required data is missing.');
  };
};

async function stops(client: Transaction, files: temp_fileData[], feedId: number) {
  const tbl = stopsTable(client);
  console.log('Loading: stops');
  const stops = files[0]?.value || [];
  if (!stops.length) return;
  for (const stop of stops) {
    console.log('  : ' + stop.stop_name);
    let able = true;
    const a = () => able = false;
    const insertData: NeededParams<typeof tbl['insert']> = {
      feed_id: feedId,
      stop_id: toStr(stop.stop_id, a),
      stop_code: Str(stop.stop_code),
      stop_name: toStr(stop.stop_name, a),
      stop_desc: Str(stop.stop_desc),
      stop_lat: toNum(stop.stop_lat, a),
      stop_lon: toNum(stop.stop_lon, a),
      // stop_geom: `Point(${toNum(stop.stop_lon, a)} ${toNum(stop.stop_lat, a)})`,
      zone_id: Str(stop.zone_id),
      stop_url: Str(stop.stop_url),
      location_type: Num(stop.location_type),
      station_id: null,
      // station_id: [toStr(stop.stop_name, a), `Point(${toNum(stop.stop_lon, a)} ${toNum(stop.stop_lat, a)})`],
      parent_station: Str(stop.parent_station),
      stop_timezone: Str(stop.stop_timezone),
      wheelchair_boarding: Num(stop.wheelchair_boarding),
      platform_code: Str(stop.platform_code),
    };
    
    if (able) {await tbl.insert(insertData)}
    else console.log('--> Error: required data is missing.');
  };
};

async function stop_times(client: Transaction, files: temp_fileData[], feedId: number) {
  const tbl = stopTimesTable(client);
  console.log('Loading: stop_times');
  const stopTimes = files[0]?.value || [];
  if (!stopTimes.length) return;
  for (const stopTime of stopTimes) {
    console.log('  : ' + stopTime.stop_id);
    let able = true;
    const a = () => able = false;
    const insertData: NeededParams<typeof tbl['insert']> = {
      feed_id: feedId,
      trip_id: toStr(stopTime.trip_id, a),
      arrival_time: toTime(stopTime.arrival_time, a),
      departure_time: toTime(stopTime.departure_time, a),
      stop_id: toStr(stopTime.stop_id, a),
      stop_sequence: toNum(stopTime.stop_sequence, a),
      stop_headsign: Str(stopTime.stop_headsign),
      pickup_type: Num(stopTime.pickup_type),
      drop_off_type: Num(stopTime.drop_off_type),
      shape_dist_traveled: Str(stopTime.shape_dist_traveled),
    };
    if (able) {await tbl.insert(insertData)}
    else console.log('--> Error: required data is missing.');
  };
};

const toStr = (v: string | undefined, a: () => void): string => {
  if (v) return v;
  a();
  return 'err';
};

const Str = (v: string | undefined): string | null => {
  if (!v || v == '') return null;
  return v;
};

const toNum = (v: string | undefined, a: () => void): number => {
  if (v) return Number(v);
  a();
  return 0;
}

const Num = (v: string | undefined): number | null => {
  if (!v) return null;
  return Number(v);
}

type NeededParams<T> = T extends (args: infer U) => unknown ? U : never;

const Iso = (v: string | undefined): string | null => {
  if (!v) return null;
  if (!/^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(v)) return null;
  return (v.slice(0, 4) + '-' + v.slice(4, 6) + '-' + v.slice(6, 8));
};

const toTime = (v: string | undefined, a: () => void) => {
  if (!v) {a(); return 0;};
  
  return (Number(v.slice(0, 2)) * 3600 + Number(v.slice(3, 5)) * 60 + Number(v.slice(6, 8)) || 0);
};

// const isNum = (v: unknown): v is number => typeof v === 'number';


const missingError = (v: string): NextResponse => {
  console.log(`--> Error: ${v} is missing.`);
  return NextResponse.json({ insertGTFS: 'error' }, { status: 500 });
};

