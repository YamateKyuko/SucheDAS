import { NextResponse } from "next/server";
import { authenticate, queryParam } from "@/app/api/common/auth";
import { getFailResponse, getGetFailResponse, getRTvehicleRequest, getRTvehicleResponse, getRTvehicleResponseEntity, isRequest } from "@/app/api/common/types";
import { getRT } from "./get";
import { providerList } from "@/app/api/common/RTproviderList";

const from = '/bus/lib/request/gtfsrt/vehicle/';
const endpoint = '/api/others/gtfsrt/vehicle/';

type dataVal = {
  lastFetchTime: number,
  cache: Map<string, getRTvehicleResponseEntity> | null,
  props: {
    name: string,
    textColor: string,
  }
};
const dataValInit: dataVal = { lastFetchTime: 0, cache: null, props: {name: '', textColor: ''} };

const data: Map<getRTvehicleRequest['provider'], dataVal> = new Map([
  ['KeioBus', dataValInit],
  ['ToeiBus', dataValInit],
  ['KantoBus', dataValInit],
]);

// const CACHE_DURATION = 60 * 1000;
const duration = 10000;

export async function GET(request: Request) {
  return await authenticate(request, getRTvehicle);
};

async function getRTvehicle(params: queryParam): Promise<NextResponse<getRTvehicleResponse | getFailResponse>> {
  if (!isRequest<getRTvehicleRequest>(params, from)) return NextResponse.json(getGetFailResponse('no query', 400), { status: 400 });

  const currentTime = Date.now();

  const provider = params.provider;
  const datum = data.get(provider);
  if (!datum) return NextResponse.json(getGetFailResponse('provider not found', 400), { status: 400 });

  if (
    datum.cache &&
    (currentTime - datum.lastFetchTime < duration)
  ) {
    return NextResponse.json({
      endpoint,
      type: 'res',
      status: 'ok',
      provider: provider,
      providerName: datum.props.name,
      textColor: datum.props.textColor,
      entities: [...datum.cache]
    });
  }

  try {
    const provObj = providerList[provider];
    if (!provObj) return NextResponse.json(getGetFailResponse('provider not found', 400), { status: 400 });
    const response = await getRT(provObj);
    if (!response) return NextResponse.json(getGetFailResponse('failed to fetch data', 500), { status: 500 });
    const entitiesMap = new Map<string, getRTvehicleResponseEntity>();
    response.forEach((entity) => {
      entitiesMap.set(entity.trip_id, entity);
    });
    data.set(provider, { lastFetchTime: currentTime, cache: entitiesMap, props: {name: provObj.name, textColor: provObj.textColor} });
    return NextResponse.json({
      endpoint,
      type: 'res',
      status: 'ok',
      provider: provider,
      providerName: provObj.name,
      textColor: provObj.textColor,
      entities: [...entitiesMap]
    });
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    return NextResponse.json(getGetFailResponse('error', 500), { status: 500 });
  }
}