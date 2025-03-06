import { getRTvehiclePositionRequestProvider } from "@/app/api/common/RTproviderList";
import { getRTvehicle } from "@/app/lib/data";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import React from 'react';
import VPmapClient from "./VPmapClient";

/** vehiclepositionのmapコンポーネント */
export default async function VPmap(props: {
  prov: getRTvehiclePositionRequestProvider
  vehicle_id?: string
}) {
  const vehiclePositionData = await VPdataGetter(props.prov, props.vehicle_id);
  if (!vehiclePositionData) return <article><section><h1>データの取得に失敗しました。</h1></section></article>;
  return (
    <>
      <VPmapClient
        VPdata={vehiclePositionData}
      />
    </>
  );
};

export type VPdataType = {
  featureCollection: FeatureCollection,
  provider: getRTvehiclePositionRequestProvider,
  providerName: string,
  imgs: {name: string, path: string}[],
  selected: selectedVehicleType | null,
};

type selectedVehicleType = {
  vehicle_id: string,
  coordinates: [number, number]
}

/** vehiclepositionのデータを取得する */
const VPdataGetter = async (
  prov: getRTvehiclePositionRequestProvider,
  selectedVehicleId?: string
): Promise<VPdataType | null> => {

  console.log('VPgetter loaded')

  const res = await getRTvehicle(prov);
  if (!res) return null;

  
  let selectedVehicle: selectedVehicleType | null = null;

  const features: Feature<Geometry, GeoJsonProperties>[] = [];
  res.entities.forEach(([, e]) => {
    if (
      !e.coordinates ||
      !e.description
    ) return;

    if (selectedVehicleId && e.vehicle_id == selectedVehicleId) {
      selectedVehicle = {
        vehicle_id: selectedVehicleId,
        coordinates: e.coordinates
      };
    };

    // 外部露出につき取り扱いに注意
    const properties = {
      description: e.description,
      bearing: e.bearing || 0,
      textcolor: res.textColor,
      provider: res.provider,
      coord: e.coordinates,
      speed: e.speed,
      status: e.status,
      timestamp: e.timestamp,
      schedule_relationship: e.schedule_relationship,
      vehicle_id: e.vehicle_id,
    };

    features.push({
      type: 'Feature',
      properties: properties,
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
    provider: res.provider,
    providerName: res.providerName,
    imgs: [{
      name: `RT${res.provider}`,
      path: `/RT${res.provider}.png`
    }],
    selected: selectedVehicle
  };
};

