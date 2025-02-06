import axios from 'axios';
import * as gtfsRealtime from '../gtfs_realtime_pb';
import { getRTtripUpdatesRequest, getRTtripUpdatesResponseEntity, getRTtripUpdatesResponseStopTimeUpdate } from "../../../common/types";
import { providerList } from '@/app/api/common/RTproviderList';

export async function getRT(provider: getRTtripUpdatesRequest['provider']): Promise<getRTtripUpdatesResponseEntity[] | null> {
  try {
    const provObj = providerList[provider];
    if (!provObj) return null;
    const response = await axios.get(
      provObj.TUendpoint,
      {
        params: {'acl:consumerKey': process.env.ACL || ''},
        responseType: 'arraybuffer'
      },
    );
    if (!response) return null;
    const buffer = response.data;
    const message = gtfsRealtime.FeedMessage.deserializeBinary(new Uint8Array(buffer));
    const object = message.toObject();
    // object.entityList = object.entityList.slice(0, 10)
    // console.log(object);
    return object.entityList.map((entity) => convEntity(entity)).flat();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function convEntity(entity: gtfsRealtime.FeedEntity.AsObject): getRTtripUpdatesResponseEntity | [] {

  const conv = <T>(val: T) => val == undefined ? null : val;
  if (
    entity.tripUpdate?.trip?.tripId == undefined
  ) return [];

  const obj: { [key: number]: getRTtripUpdatesResponseStopTimeUpdate } = {};
  entity.tripUpdate?.stopTimeUpdateList.forEach((stopTimeUpdate) => {
    const res = convList(stopTimeUpdate);
    if (res) obj[res.stop_sequence] = res;
  })

  const res = {
    id: conv(entity.id),
    isDeleted: conv(entity.isDeleted),

    trip_id: entity.tripUpdate?.trip?.tripId,
    schedule_relationship: conv(entity.tripUpdate?.trip?.scheduleRelationship),

    vehicle_id: conv(entity.tripUpdate?.vehicle?.id),
    vehicle_label: conv(entity.tripUpdate?.vehicle?.label),
    wheelchair_accessible: conv(entity.tripUpdate?.vehicle?.wheelchairAccessible),

    stop_time_update_list: obj,

    timestamp: conv(entity.tripUpdate?.timestamp),
    delay: conv(entity.tripUpdate?.delay),
  };
  return res;
};

function convList(entity: gtfsRealtime.TripUpdate.StopTimeUpdate.AsObject): getRTtripUpdatesResponseStopTimeUpdate | null {
  const conv = <T>(val: T) => val == undefined ? null : val;
  if (
    entity.stopSequence == undefined
  ) return null;
  const res = {
    stop_sequence: entity.stopSequence,
    stop_id: conv(entity.stopId),

    arrival_delay: conv(entity.arrival?.delay),
    arrival_uncertainly: conv(entity.arrival?.uncertainty),

    departure_delay: conv(entity.departure?.delay),
    departure_uncertainly: conv(entity.departure?.uncertainty),

    schedule_relationship: conv(entity.scheduleRelationship),
  };
  return res;

}
