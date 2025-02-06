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

