// export const providerList = [
//   {
//     name: 'KeioBus',
//     VPendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/odpt_KeioBus_AllLines_vehicle',
//     TUendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/odpt_KeioBus_AllLines_trip_update',
//     feed_id: 1,
//     agency_id: '',
//     params: ['acl:consumerKey'],
//   },
//   {
//     name: 'ToeiBus',
//     VPendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/ToeiBus',
//     feed_id: 2,
//     agency_id: '',
//     params: ['acl:consumerKey'],
//   }
// ] as const;

// export type getRTvehiclePositionRequestProvider = hoge<typeof providerList[number], {'VPendpoint': string}>;
// export type getRTtripUpdatesRequestProvider = hoge<typeof providerList[number], {'TUendpoint': string}>;
// type hoge<T extends typeof providerList[number], U> = T extends U ? T['name'] : never;

type providerListObj = {
  name: string,
  VPendpoint?: string,
  TUendpoint?: string,
  feed_id: number,
  agency_id: string,
  params: ['acl:consumerKey']| [],
  textColor: string,
  vehicleNum: 'label' | 'id'
};

export const providerList = {
  'KeioBus': {
    name: '京王バス',
    VPendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/odpt_KeioBus_AllLines_vehicle',
    TUendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/odpt_KeioBus_AllLines_trip_update',
    feed_id: 1,
    agency_id: '',
    params: ['acl:consumerKey'],
    textColor: '#092c70',
    vehicleNum: 'label'
  },
  'ToeiBus': {
    name: '都営バス',
    VPendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/ToeiBus',
    feed_id: 2,
    agency_id: '',
    params: ['acl:consumerKey'],
    textColor: '#66cc33',
    vehicleNum: 'label'
  },
  'KantoBus': {
    name: '関東バス',
    VPendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/odpt_KantoBus_AllLines_vehicle',
    TUendpoint: 'https://api.odpt.org/api/v4/gtfs/realtime/odpt_KantoBus_AllLines_trip_update',
    feed_id: 2,
    agency_id: '',
    params: ['acl:consumerKey'],
    textColor: '#a80043',
    vehicleNum: 'id'
  }
} as const satisfies Record<string, providerListObj>;

type TpropExtensableUlist<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
};

type keysHavingUunion<T, U> = TpropExtensableUlist<T, U>[keyof T];

export type getRTvehiclePositionRequestProvider = keysHavingUunion<typeof providerList, {'VPendpoint': string}>;
export type getRTtripUpdatesRequestProvider = keysHavingUunion<typeof providerList, {'TUendpoint': string}>;

type Permutation<T extends string, U extends string = T> =
  [T] extends [never]
    ? []
    : T extends unknown
      ? [T, ...Permutation<Exclude<U, T>>]
      : never;

export const vehiclePositionProviderList: Permutation<getRTvehiclePositionRequestProvider> = ['KeioBus', 'ToeiBus', 'KantoBus'];
export const tripUpdatesProviderList: Permutation<getRTtripUpdatesRequestProvider> = ['KeioBus', 'KantoBus'];