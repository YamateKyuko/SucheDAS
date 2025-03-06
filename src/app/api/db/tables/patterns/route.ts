import { NextResponse } from "next/server";
import { authenticate, queryParam } from "../../../common/auth";
import { getFailResponse, getGetFailResponse, getPatternsReq, getPatternsResponse, isRequest } from "@/app/api/common/types";
import { Database } from "../../sets/connection";
import { stopPatternsTable } from "../../sets/defines";

const from = '/bus/lib/request/patterns/';
const endpoint = '/api/db/tables/patterns/';

export async function GET(request: Request) {
  return authenticate(request, getPatterns);
};

async function getPatterns(params: queryParam): Promise<NextResponse<getPatternsResponse[] | getFailResponse>> {
  try {
    if (!isRequest<getPatternsReq>(params, from)) return NextResponse.json(getGetFailResponse('no query', 400), { status: 400 });
    const db = await Database.init();
    const table = stopPatternsTable(db);
    const res = await table.selectEqual(
      params.where,
      [
        // 'feed_id',
        // 'pattern_id',
        // 'agency_id',
        // 'route_id',
        // 'route_name',
        // 'direction_id',
        // 'stop_name',
        // 'stop_id',
        // 'station_id',
        // 'zone_id',
        // 'stop_headsign',
        // 'platform_code',
        // 'stop_sequence'
      ] as const
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

  // feed_id: number,
  // pattern_id: string,
  // agency_id: string,
  // route_id: string,
  // route_long_name: string,
  // route_short_name: string,
  // direction_id: string,
  // pattern_count: number,