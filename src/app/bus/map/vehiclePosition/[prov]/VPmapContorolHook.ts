'use client';
import { useEffect, useRef } from 'react';
import maplibregl, { ExpressionSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Point } from 'geojson';
import { MapHandlerType } from '../../../ui/map';
import { VPdataType } from './VPmap';
// import { handleSearchDefine } from '../ui/map';

const zoomInterpolate = (coefficient: number): ExpressionSpecification => [
  "interpolate",
  ["linear"],
  ["zoom"],
  0, coefficient * 0.125,
  8, coefficient * 0.125,
  16, coefficient
];

export default function useVPmapController(props: {
  VPdata: VPdataType,
  mapHandlerRef?: React.RefObject<MapHandlerType | null>,
}) {

  const {
    mapHandlerRef,
    VPdata: {
      featureCollection: geojson,
      imgs,
      selected
    }
  } = props;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const source = mapRef.current.getSource('geojson-source') as maplibregl.GeoJSONSource;
      if (source) source.setData(geojson);
      return;
    }

    if (mapRef.current || !mapContainerRef.current) return;

    console.log(selected);

    const selectedCoords = selected?.coordinates;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json',
      center: selectedCoords || [139.45, 35.65],
      zoom: 18,
      minZoom: 10,
      maxZoom: 17.99,
      maxBounds: [[120, 15], [155, 50]],
    });

    mapRef.current.on('load', async () => {
      console.log('map load');
      const map = mapRef.current;
      if (!map) return;

      map
        .addControl(new maplibregl.NavigationControl(), 'bottom-right')
        .addControl(new maplibregl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right')
        .addControl(new maplibregl.ScaleControl() )
        .addControl(new maplibregl.FullscreenControl() )
        .addControl(new maplibregl.GlobeControl() );

      imgs?.forEach(async ({path: imgPath, name: imgName}) => {
        const mapImg = await map.loadImage(imgPath);
        map.addImage(imgName, mapImg.data);
      });

      map.addSource('geojson-source', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 16,
        clusterRadius: 16,
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'geojson-source',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'point_count'],
            1,
            '#ffff00',
            10,
            '#ff0000'
          ],
          'circle-radius': zoomInterpolate(16)
        }
      });

      map.addLayer({
        id: 'cluster-symbol',
        type: 'symbol',
        source: 'geojson-source',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['NotoSansCJKjp-Regular'],
          'text-size': zoomInterpolate(20),
          'text-anchor': 'top',
          'text-offset': [0, -0.7],
        }
      });

      map.addLayer({
        id: 'vehicle-symbol',
        type: 'symbol',
        source: 'geojson-source',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': [
            'coalesce',
            ['image', ['concat', 'RT', ['get', 'provider']]],
            ['image', 'RTother']
          ],
          'icon-size': zoomInterpolate(3/64),
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'text-allow-overlap': true,
          'text-ignore-placement': true,
          'text-field': ['get', 'description'],
          'text-font': ['NotoSansCJKjp-Regular'],
          'text-size': zoomInterpolate(12),
          'text-offset': [0, -1.5],
          'text-anchor': 'top',
          'icon-rotate': ['get', 'bearing'],
          'text-rotate': ['get', 'bearing'],
          'text-letter-spacing': -0.05,
          'text-optional': true,
        },
        paint: {
          'text-color': ['to-color', ['get', 'textcolor'], '#000000'],
        },
      });

      // 3D効果を適用するために、カメラの傾きを設定
      // current.easeTo({ pitch: 45, bearing: 0 });
      // });
    });

    mapRef.current.on('click', async (e: maplibregl.MapMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const popup = new maplibregl.Popup();
      const popuper = (coords: [number, number], html: string) => {
        popup
          .setLngLat(coords)
          .setHTML(html)
          .addTo(map);
      }

      // console.log(e);
      const feature = map.queryRenderedFeatures(e.point, {
        layers: ['vehicle-symbol', 'cluster-symbol']
      })[0];
      if (!feature) {
        mapHandlerRef?.current?.setPathName(
          ['mode', null],
          ['vehicle_id', null]
        );
        return;
      };

      const geom = feature.geometry as Point;
      // console.log('geom:', geom)
      // console.log(feature);

      switch (feature.layer.id) {

        // バス
        case 'vehicle-symbol': {
          map.easeTo({
            center: geom.coordinates as [number, number],
            duration: 500,
            zoom: 18
          });
          popuper(geom.coordinates as [number, number], (`
            <div>${feature.properties.description}</div>
          `));
          const {vehicle_id} = feature.properties;
          if (!vehicle_id) return;
          mapHandlerRef?.current?.setPathName(
            ['mode', 'vehicle'],
            ['vehicle_id', vehicle_id]
          );
          break;
        }

        // クラスター
        case 'cluster-symbol': {
          console.log('cluster');
          const clusterId = feature.properties.cluster_id;
          const source = map.getSource<maplibregl.GeoJSONSource>('geojson-source');
          if (!source) return;
          const maxGetLeave = 20;
          const leaves = await source.getClusterLeaves(clusterId, maxGetLeave, 0);
          popuper(geom.coordinates as [number, number], (`
              <ul>
                ${leaves.map((v, i) => `
                  <li key=${i}>
                    ${
                    i == maxGetLeave - 1 ? '...' : v.properties?.description || ''
                  }
                </li>
              `).join('')}
            </ul>
          `));

          mapHandlerRef?.current?.setPathName(
            ['mode', 'cluster'],
            ['vehicle_id', leaves.map(v => v.properties?.vehicle_id).join('____')]
          );
          break;
        }
      }
    });

    if (!mapRef.current) return;
  }, [mapHandlerRef, geojson, imgs, selected]);

  // const handleSearch = () => {}

  return {
    mapContainerRef,
    // handleSearch
  }
}