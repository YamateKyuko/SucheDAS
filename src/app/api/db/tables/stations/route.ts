import { NextResponse } from "next/server";
import { authenticate } from "../../../common/auth";
import { queryParam } from "../../../common/auth";
import { parentStationsTable } from "../../sets/defines";
import { getFailResponse, getGetFailResponse, getStationsRequest, getStationsResponse, isRequest } from "@/app/api/common/types";
import { Database } from "../../sets/connection";

const from = '/bus/lib/request/stations/';
const endpoint = '/api/db/tables/stations/';

export async function GET(request: Request) {
  return authenticate(request, getStations);
};

async function getStations(params: queryParam): Promise<NextResponse<getStationsResponse[] | getFailResponse>> {
  try {
    if (!isRequest<getStationsRequest>(params, from)) return NextResponse.json(getGetFailResponse('no query', 400), { status: 400 });
    const db = await Database.init();
    const table = parentStationsTable(db);
    const isLike = 'station_name' in params.where;
    const res = await table.selectEqual(
      params.where,
      ['station_id', 'station_name', 'station_muni', 'station_town'] as const,
      isLike
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