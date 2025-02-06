import { useEffect, useRef } from 'react';
import maplibregl, { ExpressionSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FeatureCollection } from 'geojson';

const zoomInterpolate = (coefficient: number): ExpressionSpecification => [
  "interpolate",
  ["linear"],
  ["zoom"],
  0, coefficient * 0.125,
  8, coefficient * 0.125,
  16, coefficient
];

export default function useVehicleMapController(geojson: FeatureCollection) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const source = mapRef.current.getSource('geojson-source') as maplibregl.GeoJSONSource;
      if (source) source.setData(geojson);
      return;
    }

    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json',
      center: [139.45, 35.65],
      zoom: 12,
      minZoom: 10,
      maxZoom: 17.99,
      maxBounds: [[120, 15], [155, 50]],
    });

    mapRef.current.on('load', async () => {
      const map = mapRef.current;
      if (!map) return;

      const otherimg = await map.loadImage('/RTother.png');
      const keiobusimg = await map.loadImage('/RTKeioBus.png');
      const kantobusimg = await map.loadImage('/RTKantoBus.png');
      const toeibusimg = await map.loadImage('/RTToeiBus.png');

      map
        .addControl(new maplibregl.NavigationControl(), 'bottom-right')
        .addControl(new maplibregl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right')
        .addControl(new maplibregl.ScaleControl() )
        .addControl(new maplibregl.FullscreenControl() )
        .addControl(new maplibregl.GlobeControl() );
        // .addControl(new maplibregl.AttributionControl({compact: true}));

      map.addImage('RTother', otherimg.data);
      map.addImage('RTKeioBus', keiobusimg.data);
      map.addImage('RTKantoBus', kantobusimg.data);
      map.addImage('RTToeiBus', toeibusimg.data);

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
        id: 'cluster-count',
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
        id: '3d-symbol-layer',
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

    mapRef.current.on('click', 'cluster-count', async (e: maplibregl.MapMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const coordinates = e.lngLat;
      const popup = new maplibregl.Popup();

      const features = map.queryRenderedFeatures(e.point, {
        layers: ['cluster-count']
      });
      const clusterId = features[0].properties.cluster_id;
      const source = map.getSource<maplibregl.GeoJSONSource>('geojson-source');
      if (!source) return;

      const maxGetLeave = 20;

      const leaves = await source.getClusterLeaves(clusterId, maxGetLeave, 0);

      // const zoom = await source.getClusterExpansionZoom(clusterId);
      // const geom = features[0].geometry as Point;
      // const coord = geom.coordinates;
      // console.log(coord)

      // map.easeTo({
      //   center: coordinates,
      //   zoom
      // });

      console.log(leaves);

      popup
        .setLngLat(coordinates)
        .setHTML(`
          <ul>
            ${leaves.map((v, i) => `
              <li key=${i}>
                ${
                  i == maxGetLeave - 1 ? '...' : v.properties?.description || ''
                }
              </li>
            `).join('')}
          </ul>
        `)
        .addTo(map);
    });

    if (!mapRef.current) return;
  }, [geojson]);

  return {
    mapContainer: mapContainer,
  }
}