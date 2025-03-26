import axios from 'axios';
import * as gtfsRealtime from '../gtfs_realtime_pb';
import { getRTvehicleResponseEntity } from "../../../common/types";
import { providerList } from '@/app/api/common/RTproviderList';

export async function getRT(provObj: typeof providerList[keyof typeof providerList]): Promise<getRTvehicleResponseEntity[] | null> {
  try {
    const response = await fetch(provObj.VPendpoint + `?acl:consumerKey=${process.env.ACL || ''}`);
    // const response = await axios.get(
    //   provObj.VPendpoint,
    //   {
    //     params: {'acl:consumerKey': process.env.ACL || ''},
    //     responseType: 'arraybuffer'
    //   },
    // );
    if (!response) return null;
    // const buffer = response.data;
    const buffer = await response.arrayBuffer();
    const message = gtfsRealtime.FeedMessage.deserializeBinary(new Uint8Array(buffer));
    const object = message.toObject();

    const descKey = provObj.vehicleNum;
    return object.entityList.map((entity, i) => convEntity(entity, i, descKey)).flat();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function convEntity(
  entity: gtfsRealtime.FeedEntity.AsObject,
  entity_index: number,
  descKey: typeof providerList[keyof typeof providerList]['vehicleNum']
): getRTvehicleResponseEntity | [] {
  const getCoo = (entity: gtfsRealtime.Position.AsObject | undefined): [number, number] | null => {
    if (!entity) return null;
    if (!entity.latitude || !entity.longitude) return null;
    return [entity.longitude, entity.latitude];
  }
  const conv = <T>(val: T) => val == undefined ? null : val;
  if (
    entity.id == undefined ||
    entity.vehicle?.trip?.tripId == undefined
  ) return [];
  const obj = {
    id: entity.id,
    isDeleted: conv(entity.isDeleted),
    trip_id: entity.vehicle?.trip?.tripId,
    schedule_relationship: conv(entity.vehicle?.trip?.scheduleRelationship),
    vehicle_id: conv(entity.vehicle?.vehicle?.id),
    vehicle_label: conv(entity.vehicle?.vehicle?.label),
    wheelchair_accessible: conv(entity.vehicle?.vehicle?.wheelchairAccessible),
    coordinates: getCoo(entity.vehicle?.position) || null,
    bearing: conv(entity.vehicle?.position?.bearing),
    speed: conv(entity.vehicle?.position?.speed),
    stop_sequence: conv(entity.vehicle?.currentStopSequence),
    stop_id: conv(entity.vehicle?.stopId),
    status: conv(entity.vehicle?.currentStatus),
    timestamp: conv(entity.vehicle?.timestamp),
    
    entity_id: `${entity.id}_${entity_index}`,
  };

  const descGetter = () => {
    switch (descKey) {
      case 'label':
        return obj.vehicle_label;
      case 'id':
        return obj.vehicle_id;
      default:
        return null;
    }
  };

  const res = {
    ...obj,
    description: descGetter()
  }

  return res;
};

