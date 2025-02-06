import validator from 'validator';
import { Requester } from './request';
import { getPatternsReq, getPatternsResponse, getRoutesRequest, getRoutesResponse, getRTvehicleRequest, getRTvehicleResponse, getStationsRequest, getStationsResponse, getStopsReq, getStopsReturn } from '../api/common/types';
import { muni } from './muni';
import { getRTvehiclePositionRequestProvider } from '../api/common/RTproviderList';

const japaneseAlphaRegex = /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Latin}\p{General_Category=Decimal_Number}]+$/u;
type SStr = string;
const isSStr = (str: string): str is SStr => validator.matches(str, japaneseAlphaRegex);
export const SStr = (str: string | null | undefined): SStr | null => {
  if (!str) return null;
  if (!isSStr(str)) return null;
  return str;
};

export const getStrs = <T extends readonly string[]>(params: {[k: string]: string | undefined}, ...keys: T): {[K in T[number]]: string} | null => {
  const res: {[k: string]: string} = {};
  for (const key of keys) {
    const val = SStr(params[key]);
    if (!val) return null;
    res[key] = val;
  };
  return res as unknown as {[K in T[number]]: string};
};

export async function getStations(where: getStationsRequest['where']): Promise<getStationsResponse[] | undefined> {
  // if (stationName.length < 2) return undefined;
  try {
    return await Requester<getStationsRequest, getStationsResponse[]>(
      '/api/db/tables/stations/',
      {
        from: `/bus/lib/request/stations/`,
        type: 'req',
        status: 'ok',
        where: where
        // station_name: stationName
      }
    );
    // return await getRequest<getStationsResponse>('/api/db/tables/stations/', {name: stationName});
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// export async function getPlace(geom: [number, number]): Promise<getPlaceResponse | undefined> {
//   try {
//     return await getRequest<getPlaceResponse>('/api/others/place/', {lat: geom[1], lon: geom[0]}, false);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   };
// };

export function getMuni(muniCode: number): {pref: string, city: string} | undefined {
  const res = muni[muniCode];
  if (!res) return undefined;
  return {pref: res[0], city: res[1]};
};

export async function getStops(id: number): Promise<getStopsReturn[] | undefined> {
  try {
    return await Requester<getStopsReq, getStopsReturn[]>(
      '/api/db/tables/stops/',
      {
        from: `/bus/lib/request/stops/`,
        type: 'req',
        status: 'ok',
        station_id: id
      }
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getPatterns(where: getPatternsReq['where']): Promise<getPatternsResponse[] | undefined> {
  try {
    return await Requester<getPatternsReq, getPatternsResponse[]>(
      '/api/db/tables/patterns/',
      {
        from: `/bus/lib/request/patterns/`,
        type: 'req',
        status: 'ok',
        where: where
      }
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getRoutes(where: getRoutesRequest['where']): Promise<getRoutesResponse[] | undefined> {
  try {
    return await Requester<getRoutesRequest, getRoutesResponse[]>(
      '/api/db/tables/routes/',
      {
        from: `/bus/lib/request/routes/`,
        type: 'req',
        status: 'ok',
        where: where
      }
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getRTvehicle(provider: getRTvehiclePositionRequestProvider): Promise<getRTvehicleResponse | undefined> {
  try {
    return await Requester<getRTvehicleRequest, getRTvehicleResponse>(
      '/api/others/gtfsrt/vehicle/',
      {
        from: `/bus/lib/request/gtfsrt/vehicle/`,
        type: 'req',
        status: 'ok',
        provider: provider
      },
      false
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
}