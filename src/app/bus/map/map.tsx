'use client';
// import { useEffect, useRef } from 'react';
// import { ExpressionSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React from 'react';
import { FeatureCollection } from 'geojson';
import styles from './style.module.css';
import useVehicleMapController from './mapContorol';

export default function Map(props: { geojson: FeatureCollection }) {
  const {
    mapContainer
  } = useVehicleMapController(props.geojson);

  return (
    <MapContainer
      ref={mapContainer}
      geojson={props.geojson}
    />
  );
};

export function MapContainer(props: { ref: React.RefObject<HTMLDivElement | null>, geojson: FeatureCollection }) {

  // useImpectiveHandle()

  return (
    <div
      className={styles.maplibreglmap}
      ref={props.ref}
    ></div>
  );
}