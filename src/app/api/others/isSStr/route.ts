import { NextResponse } from "next/server";

import { SStr } from "../../common/vali";
import { authenticate, queryParam } from "../../db/manage/auth";

export async function GET(request: Request) {
  console.log('isSStr');
  return authenticate(request, getStops);
};

async function getStops(params: queryParam): Promise<NextResponse> {
  try {
    const str = params.str;
    if (typeof str !== 'string') return NextResponse.json(null);
    return NextResponse.json(SStr(str));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      null,
      { status: 500 }
    );
  };
};