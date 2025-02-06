import axios from "axios";

export async function getPlace(lat: number, lon: number, id: number) {

  const params: {[k: string]: string} = {
    'lat': String(lat),
    'lon': String(lon)
  };
  const res = await axios.get('https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress', { params: params });
  const result = await res.data.results;

  const { muniCd: muniCd, lv01Nm: lv01Nm } = result || {};
  const muni = Number(muniCd);
  if (isNaN(muni) || !isString(lv01Nm)) return undefined;

  return {
    station_muni: muni,
    station_town: lv01Nm,
    station_id: id
  };
};

const isString = (str: unknown): str is string => {
  return typeof str === 'string';
};

// for converting muni.js

// export default function miniconv(source: {[key: string]: string}) {
//   const obj: {[key: string]: [string, string]} = {};
//   Object.values(source).forEach((value) => {
//     const [pCo, pNa, cCo, cNa] = value.split(',');
//     if (false) {console.log(pCo, pNa, cCo, cNa);}
//     obj[cCo?.padStart(5, '0') || ''] = [pNa || '', cNa || ''];
//     // return `"${cCo?.padStart(5, '0')}": ['${pNa}', '${cNa}'],`;
//   });
//   return obj;
// }

// export async function GET(request: Request) {
//   return NextResponse.json(miniconv(array));
// }

