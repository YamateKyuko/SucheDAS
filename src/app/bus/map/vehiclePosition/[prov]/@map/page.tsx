import 'maplibre-gl/dist/maplibre-gl.css';
import React, { Suspense } from 'react';
import { getStrFromObj } from '@/app/lib/escape';
import { paramProps } from '../../../../types';
import { getRTvehiclePositionRequestProvider, vehiclePositionProviderList } from '@/app/api/common/RTproviderList';
import VPmap from '../VPmap';
// import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
// import { getRTvehiclePositionRequestProvider } from '@/app/api/common/RTproviderList';
// import { getRTvehicle } from '@/app/lib/data';

// export const revalidate = false;
export const dynamic = 'force-static';

export default async function Page(props: paramProps) {

  const p = getStrFromObj(await props.params, 'prov');
  if (!p) return <article><section><h1>パラメータを指定してください。</h1></section></article>;
  const prov = p['prov'] as getRTvehiclePositionRequestProvider;
  if (!vehiclePositionProviderList.includes(prov)) return <article><section><h1>指定されたデータは存在しません。</h1></section></article>;

  // const sp = getStrFromObj(await props.searchParams, 'vehicle_id');
  // const vehicle_id = sp?.['vehicle_id'];

  return (
    <article>
      <section>
        <h1>位置情報</h1>
      </section>
      <Suspense fallback={<section><h1>データの取得中...</h1></section>}>
        <VPmap
          vehicle_id={'2156'}
          prov={'KeioBus'}
        />
      </Suspense>
    </article>
  );
};