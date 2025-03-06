'use client';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useImperativeHandle } from 'react';
import styles from './ui.module.css';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export type handleSearchDefine = (...term: [string, string | null][]) => void;

export default function MapComponent(props: {
  mapContainerRef: React.RefObject<HTMLDivElement | null>,
  mapHandlerRef: React.RefObject<MapHandlerType | null>,
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setParam: handleSearchDefine = (...term) => {
    const params = new URLSearchParams(searchParams);
    term.forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    // window.history.pushState({}, '', `${pathname}?${params.toString()}`);
    replace(`${pathname}?${params.toString()}`);
  };
  const pathNamer = useDebouncedCallback(setParam, 500);

  useImperativeHandle<MapHandlerType, MapHandlerType>(
    props.mapHandlerRef,
    () => ({
      getPathName() {return Array.from(searchParams.entries())},
      setPathName(...args) {return pathNamer(...args)}
    }),
    [searchParams, pathNamer]
  );

  return (
    <>
      <MapContainer
        mapContainerRef={props.mapContainerRef}
      />
    </>
  );
};

export type MapHandlerType = {
  getPathName(): [string, string][],
  setPathName: handleSearchDefine,
}

export function MapContainer(props: {
  mapContainerRef: React.RefObject<HTMLDivElement | null>,
}) {
  return (
    <div
      className={styles.maplibreglmap}
      ref={props.mapContainerRef}
    ></div>
  );
};