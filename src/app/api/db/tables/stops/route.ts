import { NextResponse } from "next/server";
import { authenticate } from "../../../common/auth";
import { queryParam } from "../../../common/auth";
import { getFailResponse, getGetFailResponse, getStopsReq, getStopsReturn, isRequest } from "@/app/api/common/types";
import { Database } from "../../sets/connection";
import { stopsTable } from "../../sets/defines";

const from = '/bus/lib/request/stops/';
const endpoint = '/api/db/tables/stops/';

export async function GET(request: Request) {
  return authenticate(request, getStops);
};

async function getStops(params: queryParam): Promise<NextResponse<getStopsReturn[] | getFailResponse>> {
  try {
    if (!isRequest<getStopsReq>(params, from)) return NextResponse.json(getGetFailResponse('no query', 400), { status: 400 });
    const db = await Database.init();
    const table = stopsTable(db);
    const res = await table.selectEqual(
      {station_id: params.station_id},
      ['stop_id', 'stop_name', 'stop_geom', 'zone_id', 'platform_code'] as const
    );
    await db.release();
    return NextResponse.json([
      ...res.map((row) => {
        return {
          ...row,
          type: 'res',
          status: 'ok',
          endpoint: endpoint
        } as const;
      })
    ]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      getGetFailResponse('query failed', 500),
      { status: 500 }
    );
  };
};