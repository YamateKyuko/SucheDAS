import { NextResponse } from "next/server";
import { authenticate, queryParam } from "@/app/api/common/auth";
import { getFailResponse, getGetFailResponse, getRTtripUpdatesRequest, getRTtripUpdatesResponse, getRTtripUpdatesResponseEntity, isRequest } from "@/app/api/common/types";
import { getRT } from "./get";

const from = '/bus/lib/request/gtfsrt/tripUpdates/';
const endpoint = '/api/others/gtfsrt/tripUpdates/';

const data: Map<
getRTtripUpdatesRequest['provider'], {
  lastFetchTime: number,
  cache: Map<string, getRTtripUpdatesResponseEntity> | null,
}> = new Map([
  ['KeioBus', { lastFetchTime: 0, cache: null }]
]);

// const CACHE_DURATION = 60 * 1000;
const duration = 10000;

export async function GET(request: Request) {
  return await authenticate(request, getRTtripUpdates);
};

async function getRTtripUpdates(params: queryParam): Promise<NextResponse<getRTtripUpdatesResponse | getFailResponse>> {
  if (!isRequest<getRTtripUpdatesRequest>(params, from)) return NextResponse.json(getGetFailResponse('no query', 400), { status: 400 });

  const currentTime = Date.now();

  const provider = params.provider;
  const datum = data.get(provider);
  if (!datum) return NextResponse.json(getGetFailResponse('provider not found', 400), { status: 400 });

  // console.log('datum:', datum);
  if (
    datum.cache &&
    (currentTime - datum.lastFetchTime < duration)
  ) {
    return NextResponse.json({
      endpoint,
      type: 'res',
      status: 'ok',
      entities: [...datum.cache]
    });
  }

  try {
    const response = await getRT(provider);
    if (!response) return NextResponse.json(getGetFailResponse('failed to fetch data', 500), { status: 500 });
    const entitiesMap = new Map<string, getRTtripUpdatesResponseEntity>();
    response.forEach((entity) => {
      entitiesMap.set(entity.trip_id, entity);
    });
    data.set(provider, { lastFetchTime: currentTime, cache: entitiesMap });
    return NextResponse.json({
      endpoint,
      type: 'res',
      status: 'ok',
      entities: [...entitiesMap]
    });
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    return NextResponse.json(getGetFailResponse('error', 500), { status: 500 });
  }
}