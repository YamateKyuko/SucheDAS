import 'maplibre-gl/dist/maplibre-gl.css';
import React from 'react';
import Map from './map';
import { getStrFromObj } from '@/app/lib/escape';
import { pageProps } from '../types';
import { getRTvehicle } from '@/app/lib/data';
import { getRTvehiclePositionRequestProvider, vehiclePositionProviderList } from '@/app/api/common/RTproviderList';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import styles from './style.module.css';

const paramName = 'provider';


export default async function Page(props: pageProps) {
  const p = getStrFromObj(await props.searchParams, paramName);
  if (!p) return <article><section><h1>パラメータを指定してください。</h1></section></article>;
  const prov = p[paramName] as getRTvehiclePositionRequestProvider;
  if (!vehiclePositionProviderList.includes(prov)) return <article><section><h1>指定されたデータは存在しません。</h1></section></article>;
  
  const geojson = await getRTvehiclePositionGeoJson(prov);
  if (!geojson) return <article><section><h1>データの取得に失敗しました。</h1></section></article>;
  
  return (
    <article className={styles.mapTab}>
      <section>
        <h1>{geojson.providerName || 'バス'}・位置情報</h1>
      </section>
      <Map geojson={geojson.featureCollection} />
    </article>
  );
};

async function getRTvehiclePositionGeoJson(prov: getRTvehiclePositionRequestProvider) {
  const res = await getRTvehicle(prov);
  if (!res) return null;
  const entities = res.entities.map((e) => e[1]);

  const features: Feature<Geometry, GeoJsonProperties>[] = [];
  entities.forEach((e) => {
    if (
      !e.coordinates ||
      !e.description
    ) return;

    features.push({
      type: 'Feature',
      properties: {
        description: e.description,
        bearing: e.bearing || 0,
        textcolor: res.textColor,
        provider: res.provider,
        tripid: e.trip_id,
      },
      geometry: {
        type: 'Point',
        coordinates: e.coordinates
      }});
    });

  const sourc: FeatureCollection = {
    type: 'FeatureCollection',
    features: features,
  };
  return {
    featureCollection: sourc,
    providerName: res.providerName,
  };
};