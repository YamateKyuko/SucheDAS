'use client';
import useVPmapController from "./VPmapContorolHook";
import MapComponent, { MapHandlerType } from "../../../ui/map";
import { memo, useRef } from "react";
import { VPdataType } from "./VPmap";
// import { useSearchParams } from "next/navigation";

export const VPmapClient = memo(VPmapClientC);
export default function VPmapClientC(props: {
  VPdata: VPdataType
}) {
  console.log('memomemo')
  const mapHandlerRef = useRef<MapHandlerType | null>(null);

  const {
    mapContainerRef
  } = useVPmapController({
    VPdata: props.VPdata,
    mapHandlerRef: mapHandlerRef,
  });
  return (
    <>
      <MapComponent
        mapContainerRef={mapContainerRef}
        mapHandlerRef={mapHandlerRef}
      />
    </>
  );
};