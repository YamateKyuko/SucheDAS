import { NextResponse } from "next/server";
import { authenticate } from "../../../common/auth";
import { queryParam } from "../../../common/auth";
import { getFailResponse, getGetFailResponse, getRoutesResponse, isRequest, getRoutesRequest } from "@/app/api/common/types";
import { Database } from "../../sets/connection";
import { routesTable } from "../../sets/defines";

const from = '/bus/lib/request/routes/';
const endpoint = '/api/db/tables/routes/';

export async function GET(request: Request) {
  return authenticate(request, getRoutes);
};

async function getRoutes(params: queryParam): Promise<NextResponse<getRoutesResponse[] | getFailResponse>> {
  try {
    if (!isRequest<getRoutesRequest>(params, from)) return NextResponse.json(getGetFailResponse('no query', 400), { status: 400 });
    const db = await Database.init();
    const table = routesTable(db);
    const res = await table.selectEqual(
      params.where,
      ['route_id', 'agency_id', 'route_short_name', 'route_long_name', 'route_type'] as const
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