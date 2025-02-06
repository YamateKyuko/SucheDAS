import { NextResponse } from "next/server";
import { authenticate, queryParam } from "@/app/api/common/auth";
import axios from "axios";
import { muni } from "@/app/api/others/place/muni";
import { getFailResponse, getGetFailResponse, getPlaceResponse } from "../../common/types";

export async function GET(request: Request) {
  return NextResponse.json(undefined);
  return await authenticate(request, getPlace);
};

async function getPlace(p: queryParam): Promise<NextResponse<getPlaceResponse | getFailResponse>> {
  const lat = Number(p['lat']);
  const lon = Number(p['lon']);
  if (Number.isNaN(lat) || Number.isNaN(lon)) {return NextResponse.json(getGetFailResponse('wrong geometry', 400), { status: 400 });}
  const params: {[k: string]: string} = {
    'lat': String(lat),
    'lon': String(lon)
  };
  const res = await axios.get('https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress', { params: params });
  const result = await res.data.results;

  const { muniCd: muniCd, lv01Nm: lv01Nm } = result || {};
  const code = isString(muniCd) ? muniCd : null;
  const block = isString(lv01Nm) ? lv01Nm : null;
  const [pref, city] = code ? (muni[code] || [null, null]) : [null, null];
  
  return NextResponse.json({
    type: 'res',
    pref: pref,
    city: city,
    block: block,
    geom: [lon, lat],
    status: result ? 'ok' : 'fail',
    endpoint: '/api/others/place/'
  });
};

const isString = (str: unknown): str is string => {
  return typeof str === 'string';
};

