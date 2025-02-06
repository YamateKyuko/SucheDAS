// package: transit_realtime
// file: gtfs-realtime.proto

import * as jspb from "google-protobuf";

export class FeedMessage extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): FeedHeader;
  setHeader(value?: FeedHeader): void;

  clearEntityList(): void;
  getEntityList(): Array<FeedEntity>;
  setEntityList(value: Array<FeedEntity>): void;
  addEntity(value?: FeedEntity, index?: number): FeedEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: FeedMessage): FeedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FeedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeedMessage;
  static deserializeBinaryFromReader(message: FeedMessage, reader: jspb.BinaryReader): FeedMessage;
}

export namespace FeedMessage {
  export type AsObject = {
    header: FeedHeader.AsObject,
    entityList: Array<FeedEntity.AsObject>,
  }
}

export class FeedHeader extends jspb.Message {
  hasGtfsRealtimeVersion(): boolean;
  clearGtfsRealtimeVersion(): void;
  getGtfsRealtimeVersion(): string | undefined;
  setGtfsRealtimeVersion(value: string): void;

  hasIncrementality(): boolean;
  clearIncrementality(): void;
  getIncrementality(): FeedHeader.IncrementalityMap[keyof FeedHeader.IncrementalityMap] | undefined;
  setIncrementality(value: FeedHeader.IncrementalityMap[keyof FeedHeader.IncrementalityMap]): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): number | undefined;
  setTimestamp(value: number): void;

  hasFeedVersion(): boolean;
  clearFeedVersion(): void;
  getFeedVersion(): string | undefined;
  setFeedVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeedHeader.AsObject;
  static toObject(includeInstance: boolean, msg: FeedHeader): FeedHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FeedHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeedHeader;
  static deserializeBinaryFromReader(message: FeedHeader, reader: jspb.BinaryReader): FeedHeader;
}

export namespace FeedHeader {
  export type AsObject = {
    gtfsRealtimeVersion?: string,
    incrementality?: FeedHeader.IncrementalityMap[keyof FeedHeader.IncrementalityMap],
    timestamp?: number,
    feedVersion?: string,
  }

  export interface IncrementalityMap {
    FULL_DATASET: 0;
    DIFFERENTIAL: 1;
  }

  export const Incrementality: IncrementalityMap;
}

export class FeedEntity extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): string | undefined;
  setId(value: string): void;

  hasIsDeleted(): boolean;
  clearIsDeleted(): void;
  getIsDeleted(): boolean | undefined;
  setIsDeleted(value: boolean): void;

  hasTripUpdate(): boolean;
  clearTripUpdate(): void;
  getTripUpdate(): TripUpdate | undefined;
  setTripUpdate(value?: TripUpdate): void;

  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): VehiclePosition | undefined;
  setVehicle(value?: VehiclePosition): void;

  hasAlert(): boolean;
  clearAlert(): void;
  getAlert(): Alert | undefined;
  setAlert(value?: Alert): void;

  hasShape(): boolean;
  clearShape(): void;
  getShape(): Shape | undefined;
  setShape(value?: Shape): void;

  hasStop(): boolean;
  clearStop(): void;
  getStop(): Stop | undefined;
  setStop(value?: Stop): void;

  hasTripModifications(): boolean;
  clearTripModifications(): void;
  getTripModifications(): TripModifications | undefined;
  setTripModifications(value?: TripModifications): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeedEntity.AsObject;
  static toObject(includeInstance: boolean, msg: FeedEntity): FeedEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FeedEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeedEntity;
  static deserializeBinaryFromReader(message: FeedEntity, reader: jspb.BinaryReader): FeedEntity;
}

export namespace FeedEntity {
  export type AsObject = {
    id?: string,
    isDeleted?: boolean,
    tripUpdate?: TripUpdate.AsObject,
    vehicle?: VehiclePosition.AsObject,
    alert?: Alert.AsObject,
    shape?: Shape.AsObject,
    stop?: Stop.AsObject,
    tripModifications?: TripModifications.AsObject,
  }
}

export class TripUpdate extends jspb.Message {
  hasTrip(): boolean;
  clearTrip(): void;
  getTrip(): TripDescriptor;
  setTrip(value?: TripDescriptor): void;

  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): VehicleDescriptor | undefined;
  setVehicle(value?: VehicleDescriptor): void;

  clearStopTimeUpdateList(): void;
  getStopTimeUpdateList(): Array<TripUpdate.StopTimeUpdate>;
  setStopTimeUpdateList(value: Array<TripUpdate.StopTimeUpdate>): void;
  addStopTimeUpdate(value?: TripUpdate.StopTimeUpdate, index?: number): TripUpdate.StopTimeUpdate;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): number | undefined;
  setTimestamp(value: number): void;

  hasDelay(): boolean;
  clearDelay(): void;
  getDelay(): number | undefined;
  setDelay(value: number): void;

  hasTripProperties(): boolean;
  clearTripProperties(): void;
  getTripProperties(): TripUpdate.TripProperties | undefined;
  setTripProperties(value?: TripUpdate.TripProperties): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TripUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: TripUpdate): TripUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TripUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TripUpdate;
  static deserializeBinaryFromReader(message: TripUpdate, reader: jspb.BinaryReader): TripUpdate;
}

export namespace TripUpdate {
  export type AsObject = {
    trip: TripDescriptor.AsObject,
    vehicle?: VehicleDescriptor.AsObject,
    stopTimeUpdateList: Array<TripUpdate.StopTimeUpdate.AsObject>,
    timestamp?: number,
    delay?: number,
    tripProperties?: TripUpdate.TripProperties.AsObject,
  }

  export class StopTimeEvent extends jspb.Message {
    hasDelay(): boolean;
    clearDelay(): void;
    getDelay(): number | undefined;
    setDelay(value: number): void;

    hasTime(): boolean;
    clearTime(): void;
    getTime(): number | undefined;
    setTime(value: number): void;

    hasUncertainty(): boolean;
    clearUncertainty(): void;
    getUncertainty(): number | undefined;
    setUncertainty(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopTimeEvent.AsObject;
    static toObject(includeInstance: boolean, msg: StopTimeEvent): StopTimeEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopTimeEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopTimeEvent;
    static deserializeBinaryFromReader(message: StopTimeEvent, reader: jspb.BinaryReader): StopTimeEvent;
  }

  export namespace StopTimeEvent {
    export type AsObject = {
      delay?: number,
      time?: number,
      uncertainty?: number,
    }
  }

  export class StopTimeUpdate extends jspb.Message {
    hasStopSequence(): boolean;
    clearStopSequence(): void;
    getStopSequence(): number | undefined;
    setStopSequence(value: number): void;

    hasStopId(): boolean;
    clearStopId(): void;
    getStopId(): string | undefined;
    setStopId(value: string): void;

    hasArrival(): boolean;
    clearArrival(): void;
    getArrival(): TripUpdate.StopTimeEvent | undefined;
    setArrival(value?: TripUpdate.StopTimeEvent): void;

    hasDeparture(): boolean;
    clearDeparture(): void;
    getDeparture(): TripUpdate.StopTimeEvent | undefined;
    setDeparture(value?: TripUpdate.StopTimeEvent): void;

    hasDepartureOccupancyStatus(): boolean;
    clearDepartureOccupancyStatus(): void;
    getDepartureOccupancyStatus(): VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap] | undefined;
    setDepartureOccupancyStatus(value: VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap]): void;

    hasScheduleRelationship(): boolean;
    clearScheduleRelationship(): void;
    getScheduleRelationship(): TripUpdate.StopTimeUpdate.ScheduleRelationshipMap[keyof TripUpdate.StopTimeUpdate.ScheduleRelationshipMap] | undefined;
    setScheduleRelationship(value: TripUpdate.StopTimeUpdate.ScheduleRelationshipMap[keyof TripUpdate.StopTimeUpdate.ScheduleRelationshipMap]): void;

    hasStopTimeProperties(): boolean;
    clearStopTimeProperties(): void;
    getStopTimeProperties(): TripUpdate.StopTimeUpdate.StopTimeProperties | undefined;
    setStopTimeProperties(value?: TripUpdate.StopTimeUpdate.StopTimeProperties): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopTimeUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: StopTimeUpdate): StopTimeUpdate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopTimeUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopTimeUpdate;
    static deserializeBinaryFromReader(message: StopTimeUpdate, reader: jspb.BinaryReader): StopTimeUpdate;
  }

  export namespace StopTimeUpdate {
    export type AsObject = {
      stopSequence?: number,
      stopId?: string,
      arrival?: TripUpdate.StopTimeEvent.AsObject,
      departure?: TripUpdate.StopTimeEvent.AsObject,
      departureOccupancyStatus?: VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap],
      scheduleRelationship?: TripUpdate.StopTimeUpdate.ScheduleRelationshipMap[keyof TripUpdate.StopTimeUpdate.ScheduleRelationshipMap],
      stopTimeProperties?: TripUpdate.StopTimeUpdate.StopTimeProperties.AsObject,
    }

    export class StopTimeProperties extends jspb.Message {
      hasAssignedStopId(): boolean;
      clearAssignedStopId(): void;
      getAssignedStopId(): string | undefined;
      setAssignedStopId(value: string): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): StopTimeProperties.AsObject;
      static toObject(includeInstance: boolean, msg: StopTimeProperties): StopTimeProperties.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: StopTimeProperties, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): StopTimeProperties;
      static deserializeBinaryFromReader(message: StopTimeProperties, reader: jspb.BinaryReader): StopTimeProperties;
    }

    export namespace StopTimeProperties {
      export type AsObject = {
        assignedStopId?: string,
      }
    }

    export interface ScheduleRelationshipMap {
      SCHEDULED: 0;
      SKIPPED: 1;
      NO_DATA: 2;
      UNSCHEDULED: 3;
    }

    export const ScheduleRelationship: ScheduleRelationshipMap;
  }

  export class TripProperties extends jspb.Message {
    hasTripId(): boolean;
    clearTripId(): void;
    getTripId(): string | undefined;
    setTripId(value: string): void;

    hasStartDate(): boolean;
    clearStartDate(): void;
    getStartDate(): string | undefined;
    setStartDate(value: string): void;

    hasStartTime(): boolean;
    clearStartTime(): void;
    getStartTime(): string | undefined;
    setStartTime(value: string): void;

    hasShapeId(): boolean;
    clearShapeId(): void;
    getShapeId(): string | undefined;
    setShapeId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TripProperties.AsObject;
    static toObject(includeInstance: boolean, msg: TripProperties): TripProperties.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TripProperties, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TripProperties;
    static deserializeBinaryFromReader(message: TripProperties, reader: jspb.BinaryReader): TripProperties;
  }

  export namespace TripProperties {
    export type AsObject = {
      tripId?: string,
      startDate?: string,
      startTime?: string,
      shapeId?: string,
    }
  }
}

export class VehiclePosition extends jspb.Message {
  hasTrip(): boolean;
  clearTrip(): void;
  getTrip(): TripDescriptor | undefined;
  setTrip(value?: TripDescriptor): void;

  hasVehicle(): boolean;
  clearVehicle(): void;
  getVehicle(): VehicleDescriptor | undefined;
  setVehicle(value?: VehicleDescriptor): void;

  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): Position | undefined;
  setPosition(value?: Position): void;

  hasCurrentStopSequence(): boolean;
  clearCurrentStopSequence(): void;
  getCurrentStopSequence(): number | undefined;
  setCurrentStopSequence(value: number): void;

  hasStopId(): boolean;
  clearStopId(): void;
  getStopId(): string | undefined;
  setStopId(value: string): void;

  hasCurrentStatus(): boolean;
  clearCurrentStatus(): void;
  getCurrentStatus(): VehiclePosition.VehicleStopStatusMap[keyof VehiclePosition.VehicleStopStatusMap] | undefined;
  setCurrentStatus(value: VehiclePosition.VehicleStopStatusMap[keyof VehiclePosition.VehicleStopStatusMap]): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): number | undefined;
  setTimestamp(value: number): void;

  hasCongestionLevel(): boolean;
  clearCongestionLevel(): void;
  getCongestionLevel(): VehiclePosition.CongestionLevelMap[keyof VehiclePosition.CongestionLevelMap] | undefined;
  setCongestionLevel(value: VehiclePosition.CongestionLevelMap[keyof VehiclePosition.CongestionLevelMap]): void;

  hasOccupancyStatus(): boolean;
  clearOccupancyStatus(): void;
  getOccupancyStatus(): VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap] | undefined;
  setOccupancyStatus(value: VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap]): void;

  hasOccupancyPercentage(): boolean;
  clearOccupancyPercentage(): void;
  getOccupancyPercentage(): number | undefined;
  setOccupancyPercentage(value: number): void;

  clearMultiCarriageDetailsList(): void;
  getMultiCarriageDetailsList(): Array<VehiclePosition.CarriageDetails>;
  setMultiCarriageDetailsList(value: Array<VehiclePosition.CarriageDetails>): void;
  addMultiCarriageDetails(value?: VehiclePosition.CarriageDetails, index?: number): VehiclePosition.CarriageDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehiclePosition.AsObject;
  static toObject(includeInstance: boolean, msg: VehiclePosition): VehiclePosition.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VehiclePosition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehiclePosition;
  static deserializeBinaryFromReader(message: VehiclePosition, reader: jspb.BinaryReader): VehiclePosition;
}

export namespace VehiclePosition {
  export type AsObject = {
    trip?: TripDescriptor.AsObject,
    vehicle?: VehicleDescriptor.AsObject,
    position?: Position.AsObject,
    currentStopSequence?: number,
    stopId?: string,
    currentStatus?: VehiclePosition.VehicleStopStatusMap[keyof VehiclePosition.VehicleStopStatusMap],
    timestamp?: number,
    congestionLevel?: VehiclePosition.CongestionLevelMap[keyof VehiclePosition.CongestionLevelMap],
    occupancyStatus?: VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap],
    occupancyPercentage?: number,
    multiCarriageDetailsList: Array<VehiclePosition.CarriageDetails.AsObject>,
  }

  export class CarriageDetails extends jspb.Message {
    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): void;

    hasLabel(): boolean;
    clearLabel(): void;
    getLabel(): string | undefined;
    setLabel(value: string): void;

    hasOccupancyStatus(): boolean;
    clearOccupancyStatus(): void;
    getOccupancyStatus(): VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap] | undefined;
    setOccupancyStatus(value: VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap]): void;

    hasOccupancyPercentage(): boolean;
    clearOccupancyPercentage(): void;
    getOccupancyPercentage(): number | undefined;
    setOccupancyPercentage(value: number): void;

    hasCarriageSequence(): boolean;
    clearCarriageSequence(): void;
    getCarriageSequence(): number | undefined;
    setCarriageSequence(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CarriageDetails.AsObject;
    static toObject(includeInstance: boolean, msg: CarriageDetails): CarriageDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CarriageDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CarriageDetails;
    static deserializeBinaryFromReader(message: CarriageDetails, reader: jspb.BinaryReader): CarriageDetails;
  }

  export namespace CarriageDetails {
    export type AsObject = {
      id?: string,
      label?: string,
      occupancyStatus?: VehiclePosition.OccupancyStatusMap[keyof VehiclePosition.OccupancyStatusMap],
      occupancyPercentage?: number,
      carriageSequence?: number,
    }
  }

  export interface VehicleStopStatusMap {
    INCOMING_AT: 0;
    STOPPED_AT: 1;
    IN_TRANSIT_TO: 2;
  }

  export const VehicleStopStatus: VehicleStopStatusMap;

  export interface CongestionLevelMap {
    UNKNOWN_CONGESTION_LEVEL: 0;
    RUNNING_SMOOTHLY: 1;
    STOP_AND_GO: 2;
    CONGESTION: 3;
    SEVERE_CONGESTION: 4;
  }

  export const CongestionLevel: CongestionLevelMap;

  export interface OccupancyStatusMap {
    EMPTY: 0;
    MANY_SEATS_AVAILABLE: 1;
    FEW_SEATS_AVAILABLE: 2;
    STANDING_ROOM_ONLY: 3;
    CRUSHED_STANDING_ROOM_ONLY: 4;
    FULL: 5;
    NOT_ACCEPTING_PASSENGERS: 6;
    NO_DATA_AVAILABLE: 7;
    NOT_BOARDABLE: 8;
  }

  export const OccupancyStatus: OccupancyStatusMap;
}

export class Alert extends jspb.Message {
  clearActivePeriodList(): void;
  getActivePeriodList(): Array<TimeRange>;
  setActivePeriodList(value: Array<TimeRange>): void;
  addActivePeriod(value?: TimeRange, index?: number): TimeRange;

  clearInformedEntityList(): void;
  getInformedEntityList(): Array<EntitySelector>;
  setInformedEntityList(value: Array<EntitySelector>): void;
  addInformedEntity(value?: EntitySelector, index?: number): EntitySelector;

  hasCause(): boolean;
  clearCause(): void;
  getCause(): Alert.CauseMap[keyof Alert.CauseMap] | undefined;
  setCause(value: Alert.CauseMap[keyof Alert.CauseMap]): void;

  hasEffect(): boolean;
  clearEffect(): void;
  getEffect(): Alert.EffectMap[keyof Alert.EffectMap] | undefined;
  setEffect(value: Alert.EffectMap[keyof Alert.EffectMap]): void;

  hasUrl(): boolean;
  clearUrl(): void;
  getUrl(): TranslatedString | undefined;
  setUrl(value?: TranslatedString): void;

  hasHeaderText(): boolean;
  clearHeaderText(): void;
  getHeaderText(): TranslatedString | undefined;
  setHeaderText(value?: TranslatedString): void;

  hasDescriptionText(): boolean;
  clearDescriptionText(): void;
  getDescriptionText(): TranslatedString | undefined;
  setDescriptionText(value?: TranslatedString): void;

  hasTtsHeaderText(): boolean;
  clearTtsHeaderText(): void;
  getTtsHeaderText(): TranslatedString | undefined;
  setTtsHeaderText(value?: TranslatedString): void;

  hasTtsDescriptionText(): boolean;
  clearTtsDescriptionText(): void;
  getTtsDescriptionText(): TranslatedString | undefined;
  setTtsDescriptionText(value?: TranslatedString): void;

  hasSeverityLevel(): boolean;
  clearSeverityLevel(): void;
  getSeverityLevel(): Alert.SeverityLevelMap[keyof Alert.SeverityLevelMap] | undefined;
  setSeverityLevel(value: Alert.SeverityLevelMap[keyof Alert.SeverityLevelMap]): void;

  hasImage(): boolean;
  clearImage(): void;
  getImage(): TranslatedImage | undefined;
  setImage(value?: TranslatedImage): void;

  hasImageAlternativeText(): boolean;
  clearImageAlternativeText(): void;
  getImageAlternativeText(): TranslatedString | undefined;
  setImageAlternativeText(value?: TranslatedString): void;

  hasCauseDetail(): boolean;
  clearCauseDetail(): void;
  getCauseDetail(): TranslatedString | undefined;
  setCauseDetail(value?: TranslatedString): void;

  hasEffectDetail(): boolean;
  clearEffectDetail(): void;
  getEffectDetail(): TranslatedString | undefined;
  setEffectDetail(value?: TranslatedString): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Alert.AsObject;
  static toObject(includeInstance: boolean, msg: Alert): Alert.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Alert, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Alert;
  static deserializeBinaryFromReader(message: Alert, reader: jspb.BinaryReader): Alert;
}

export namespace Alert {
  export type AsObject = {
    activePeriodList: Array<TimeRange.AsObject>,
    informedEntityList: Array<EntitySelector.AsObject>,
    cause?: Alert.CauseMap[keyof Alert.CauseMap],
    effect?: Alert.EffectMap[keyof Alert.EffectMap],
    url?: TranslatedString.AsObject,
    headerText?: TranslatedString.AsObject,
    descriptionText?: TranslatedString.AsObject,
    ttsHeaderText?: TranslatedString.AsObject,
    ttsDescriptionText?: TranslatedString.AsObject,
    severityLevel?: Alert.SeverityLevelMap[keyof Alert.SeverityLevelMap],
    image?: TranslatedImage.AsObject,
    imageAlternativeText?: TranslatedString.AsObject,
    causeDetail?: TranslatedString.AsObject,
    effectDetail?: TranslatedString.AsObject,
  }

  export interface CauseMap {
    UNKNOWN_CAUSE: 1;
    OTHER_CAUSE: 2;
    TECHNICAL_PROBLEM: 3;
    STRIKE: 4;
    DEMONSTRATION: 5;
    ACCIDENT: 6;
    HOLIDAY: 7;
    WEATHER: 8;
    MAINTENANCE: 9;
    CONSTRUCTION: 10;
    POLICE_ACTIVITY: 11;
    MEDICAL_EMERGENCY: 12;
  }

  export const Cause: CauseMap;

  export interface EffectMap {
    NO_SERVICE: 1;
    REDUCED_SERVICE: 2;
    SIGNIFICANT_DELAYS: 3;
    DETOUR: 4;
    ADDITIONAL_SERVICE: 5;
    MODIFIED_SERVICE: 6;
    OTHER_EFFECT: 7;
    UNKNOWN_EFFECT: 8;
    STOP_MOVED: 9;
    NO_EFFECT: 10;
    ACCESSIBILITY_ISSUE: 11;
  }

  export const Effect: EffectMap;

  export interface SeverityLevelMap {
    UNKNOWN_SEVERITY: 1;
    INFO: 2;
    WARNING: 3;
    SEVERE: 4;
  }

  export const SeverityLevel: SeverityLevelMap;
}

export class TimeRange extends jspb.Message {
  hasStart(): boolean;
  clearStart(): void;
  getStart(): number | undefined;
  setStart(value: number): void;

  hasEnd(): boolean;
  clearEnd(): void;
  getEnd(): number | undefined;
  setEnd(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimeRange.AsObject;
  static toObject(includeInstance: boolean, msg: TimeRange): TimeRange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimeRange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimeRange;
  static deserializeBinaryFromReader(message: TimeRange, reader: jspb.BinaryReader): TimeRange;
}

export namespace TimeRange {
  export type AsObject = {
    start?: number,
    end?: number,
  }
}

export class Position extends jspb.Message {
  hasLatitude(): boolean;
  clearLatitude(): void;
  getLatitude(): number | undefined;
  setLatitude(value: number): void;

  hasLongitude(): boolean;
  clearLongitude(): void;
  getLongitude(): number | undefined;
  setLongitude(value: number): void;

  hasBearing(): boolean;
  clearBearing(): void;
  getBearing(): number | undefined;
  setBearing(value: number): void;

  hasOdometer(): boolean;
  clearOdometer(): void;
  getOdometer(): number | undefined;
  setOdometer(value: number): void;

  hasSpeed(): boolean;
  clearSpeed(): void;
  getSpeed(): number | undefined;
  setSpeed(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Position.AsObject;
  static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Position;
  static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
}

export namespace Position {
  export type AsObject = {
    latitude?: number,
    longitude?: number,
    bearing?: number,
    odometer?: number,
    speed?: number,
  }
}

export class TripDescriptor extends jspb.Message {
  hasTripId(): boolean;
  clearTripId(): void;
  getTripId(): string | undefined;
  setTripId(value: string): void;

  hasRouteId(): boolean;
  clearRouteId(): void;
  getRouteId(): string | undefined;
  setRouteId(value: string): void;

  hasDirectionId(): boolean;
  clearDirectionId(): void;
  getDirectionId(): number | undefined;
  setDirectionId(value: number): void;

  hasStartTime(): boolean;
  clearStartTime(): void;
  getStartTime(): string | undefined;
  setStartTime(value: string): void;

  hasStartDate(): boolean;
  clearStartDate(): void;
  getStartDate(): string | undefined;
  setStartDate(value: string): void;

  hasScheduleRelationship(): boolean;
  clearScheduleRelationship(): void;
  getScheduleRelationship(): TripDescriptor.ScheduleRelationshipMap[keyof TripDescriptor.ScheduleRelationshipMap] | undefined;
  setScheduleRelationship(value: TripDescriptor.ScheduleRelationshipMap[keyof TripDescriptor.ScheduleRelationshipMap]): void;

  hasModifiedTrip(): boolean;
  clearModifiedTrip(): void;
  getModifiedTrip(): TripDescriptor.ModifiedTripSelector | undefined;
  setModifiedTrip(value?: TripDescriptor.ModifiedTripSelector): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TripDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: TripDescriptor): TripDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TripDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TripDescriptor;
  static deserializeBinaryFromReader(message: TripDescriptor, reader: jspb.BinaryReader): TripDescriptor;
}

export namespace TripDescriptor {
  export type AsObject = {
    tripId?: string,
    routeId?: string,
    directionId?: number,
    startTime?: string,
    startDate?: string,
    scheduleRelationship?: TripDescriptor.ScheduleRelationshipMap[keyof TripDescriptor.ScheduleRelationshipMap],
    modifiedTrip?: TripDescriptor.ModifiedTripSelector.AsObject,
  }

  export class ModifiedTripSelector extends jspb.Message {
    hasModificationsId(): boolean;
    clearModificationsId(): void;
    getModificationsId(): string | undefined;
    setModificationsId(value: string): void;

    hasAffectedTripId(): boolean;
    clearAffectedTripId(): void;
    getAffectedTripId(): string | undefined;
    setAffectedTripId(value: string): void;

    hasStartTime(): boolean;
    clearStartTime(): void;
    getStartTime(): string | undefined;
    setStartTime(value: string): void;

    hasStartDate(): boolean;
    clearStartDate(): void;
    getStartDate(): string | undefined;
    setStartDate(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ModifiedTripSelector.AsObject;
    static toObject(includeInstance: boolean, msg: ModifiedTripSelector): ModifiedTripSelector.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ModifiedTripSelector, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ModifiedTripSelector;
    static deserializeBinaryFromReader(message: ModifiedTripSelector, reader: jspb.BinaryReader): ModifiedTripSelector;
  }

  export namespace ModifiedTripSelector {
    export type AsObject = {
      modificationsId?: string,
      affectedTripId?: string,
      startTime?: string,
      startDate?: string,
    }
  }

  export interface ScheduleRelationshipMap {
    SCHEDULED: 0;
    ADDED: 1;
    UNSCHEDULED: 2;
    CANCELED: 3;
    REPLACEMENT: 5;
    DUPLICATED: 6;
    DELETED: 7;
  }

  export const ScheduleRelationship: ScheduleRelationshipMap;
}

export class VehicleDescriptor extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): string | undefined;
  setId(value: string): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): string | undefined;
  setLabel(value: string): void;

  hasLicensePlate(): boolean;
  clearLicensePlate(): void;
  getLicensePlate(): string | undefined;
  setLicensePlate(value: string): void;

  hasWheelchairAccessible(): boolean;
  clearWheelchairAccessible(): void;
  getWheelchairAccessible(): VehicleDescriptor.WheelchairAccessibleMap[keyof VehicleDescriptor.WheelchairAccessibleMap] | undefined;
  setWheelchairAccessible(value: VehicleDescriptor.WheelchairAccessibleMap[keyof VehicleDescriptor.WheelchairAccessibleMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehicleDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: VehicleDescriptor): VehicleDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VehicleDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehicleDescriptor;
  static deserializeBinaryFromReader(message: VehicleDescriptor, reader: jspb.BinaryReader): VehicleDescriptor;
}

export namespace VehicleDescriptor {
  export type AsObject = {
    id?: string,
    label?: string,
    licensePlate?: string,
    wheelchairAccessible?: VehicleDescriptor.WheelchairAccessibleMap[keyof VehicleDescriptor.WheelchairAccessibleMap],
  }

  export interface WheelchairAccessibleMap {
    NO_VALUE: 0;
    UNKNOWN: 1;
    WHEELCHAIR_ACCESSIBLE: 2;
    WHEELCHAIR_INACCESSIBLE: 3;
  }

  export const WheelchairAccessible: WheelchairAccessibleMap;
}

export class EntitySelector extends jspb.Message {
  hasAgencyId(): boolean;
  clearAgencyId(): void;
  getAgencyId(): string | undefined;
  setAgencyId(value: string): void;

  hasRouteId(): boolean;
  clearRouteId(): void;
  getRouteId(): string | undefined;
  setRouteId(value: string): void;

  hasRouteType(): boolean;
  clearRouteType(): void;
  getRouteType(): number | undefined;
  setRouteType(value: number): void;

  hasTrip(): boolean;
  clearTrip(): void;
  getTrip(): TripDescriptor | undefined;
  setTrip(value?: TripDescriptor): void;

  hasStopId(): boolean;
  clearStopId(): void;
  getStopId(): string | undefined;
  setStopId(value: string): void;

  hasDirectionId(): boolean;
  clearDirectionId(): void;
  getDirectionId(): number | undefined;
  setDirectionId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntitySelector.AsObject;
  static toObject(includeInstance: boolean, msg: EntitySelector): EntitySelector.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntitySelector, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntitySelector;
  static deserializeBinaryFromReader(message: EntitySelector, reader: jspb.BinaryReader): EntitySelector;
}

export namespace EntitySelector {
  export type AsObject = {
    agencyId?: string,
    routeId?: string,
    routeType?: number,
    trip?: TripDescriptor.AsObject,
    stopId?: string,
    directionId?: number,
  }
}

export class TranslatedString extends jspb.Message {
  clearTranslationList(): void;
  getTranslationList(): Array<TranslatedString.Translation>;
  setTranslationList(value: Array<TranslatedString.Translation>): void;
  addTranslation(value?: TranslatedString.Translation, index?: number): TranslatedString.Translation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslatedString.AsObject;
  static toObject(includeInstance: boolean, msg: TranslatedString): TranslatedString.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TranslatedString, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslatedString;
  static deserializeBinaryFromReader(message: TranslatedString, reader: jspb.BinaryReader): TranslatedString;
}

export namespace TranslatedString {
  export type AsObject = {
    translationList: Array<TranslatedString.Translation.AsObject>,
  }

  export class Translation extends jspb.Message {
    hasText(): boolean;
    clearText(): void;
    getText(): string | undefined;
    setText(value: string): void;

    hasLanguage(): boolean;
    clearLanguage(): void;
    getLanguage(): string | undefined;
    setLanguage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Translation.AsObject;
    static toObject(includeInstance: boolean, msg: Translation): Translation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Translation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Translation;
    static deserializeBinaryFromReader(message: Translation, reader: jspb.BinaryReader): Translation;
  }

  export namespace Translation {
    export type AsObject = {
      text?: string,
      language?: string,
    }
  }
}

export class TranslatedImage extends jspb.Message {
  clearLocalizedImageList(): void;
  getLocalizedImageList(): Array<TranslatedImage.LocalizedImage>;
  setLocalizedImageList(value: Array<TranslatedImage.LocalizedImage>): void;
  addLocalizedImage(value?: TranslatedImage.LocalizedImage, index?: number): TranslatedImage.LocalizedImage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslatedImage.AsObject;
  static toObject(includeInstance: boolean, msg: TranslatedImage): TranslatedImage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TranslatedImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslatedImage;
  static deserializeBinaryFromReader(message: TranslatedImage, reader: jspb.BinaryReader): TranslatedImage;
}

export namespace TranslatedImage {
  export type AsObject = {
    localizedImageList: Array<TranslatedImage.LocalizedImage.AsObject>,
  }

  export class LocalizedImage extends jspb.Message {
    hasUrl(): boolean;
    clearUrl(): void;
    getUrl(): string | undefined;
    setUrl(value: string): void;

    hasMediaType(): boolean;
    clearMediaType(): void;
    getMediaType(): string | undefined;
    setMediaType(value: string): void;

    hasLanguage(): boolean;
    clearLanguage(): void;
    getLanguage(): string | undefined;
    setLanguage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LocalizedImage.AsObject;
    static toObject(includeInstance: boolean, msg: LocalizedImage): LocalizedImage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LocalizedImage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LocalizedImage;
    static deserializeBinaryFromReader(message: LocalizedImage, reader: jspb.BinaryReader): LocalizedImage;
  }

  export namespace LocalizedImage {
    export type AsObject = {
      url?: string,
      mediaType?: string,
      language?: string,
    }
  }
}

export class Shape extends jspb.Message {
  hasShapeId(): boolean;
  clearShapeId(): void;
  getShapeId(): string | undefined;
  setShapeId(value: string): void;

  hasEncodedPolyline(): boolean;
  clearEncodedPolyline(): void;
  getEncodedPolyline(): string | undefined;
  setEncodedPolyline(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Shape.AsObject;
  static toObject(includeInstance: boolean, msg: Shape): Shape.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Shape, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Shape;
  static deserializeBinaryFromReader(message: Shape, reader: jspb.BinaryReader): Shape;
}

export namespace Shape {
  export type AsObject = {
    shapeId?: string,
    encodedPolyline?: string,
  }
}

export class Stop extends jspb.Message {
  hasStopId(): boolean;
  clearStopId(): void;
  getStopId(): string | undefined;
  setStopId(value: string): void;

  hasStopCode(): boolean;
  clearStopCode(): void;
  getStopCode(): TranslatedString | undefined;
  setStopCode(value?: TranslatedString): void;

  hasStopName(): boolean;
  clearStopName(): void;
  getStopName(): TranslatedString | undefined;
  setStopName(value?: TranslatedString): void;

  hasTtsStopName(): boolean;
  clearTtsStopName(): void;
  getTtsStopName(): TranslatedString | undefined;
  setTtsStopName(value?: TranslatedString): void;

  hasStopDesc(): boolean;
  clearStopDesc(): void;
  getStopDesc(): TranslatedString | undefined;
  setStopDesc(value?: TranslatedString): void;

  hasStopLat(): boolean;
  clearStopLat(): void;
  getStopLat(): number | undefined;
  setStopLat(value: number): void;

  hasStopLon(): boolean;
  clearStopLon(): void;
  getStopLon(): number | undefined;
  setStopLon(value: number): void;

  hasZoneId(): boolean;
  clearZoneId(): void;
  getZoneId(): string | undefined;
  setZoneId(value: string): void;

  hasStopUrl(): boolean;
  clearStopUrl(): void;
  getStopUrl(): TranslatedString | undefined;
  setStopUrl(value?: TranslatedString): void;

  hasParentStation(): boolean;
  clearParentStation(): void;
  getParentStation(): string | undefined;
  setParentStation(value: string): void;

  hasStopTimezone(): boolean;
  clearStopTimezone(): void;
  getStopTimezone(): string | undefined;
  setStopTimezone(value: string): void;

  hasWheelchairBoarding(): boolean;
  clearWheelchairBoarding(): void;
  getWheelchairBoarding(): Stop.WheelchairBoardingMap[keyof Stop.WheelchairBoardingMap] | undefined;
  setWheelchairBoarding(value: Stop.WheelchairBoardingMap[keyof Stop.WheelchairBoardingMap]): void;

  hasLevelId(): boolean;
  clearLevelId(): void;
  getLevelId(): string | undefined;
  setLevelId(value: string): void;

  hasPlatformCode(): boolean;
  clearPlatformCode(): void;
  getPlatformCode(): TranslatedString | undefined;
  setPlatformCode(value?: TranslatedString): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Stop.AsObject;
  static toObject(includeInstance: boolean, msg: Stop): Stop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Stop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Stop;
  static deserializeBinaryFromReader(message: Stop, reader: jspb.BinaryReader): Stop;
}

export namespace Stop {
  export type AsObject = {
    stopId?: string,
    stopCode?: TranslatedString.AsObject,
    stopName?: TranslatedString.AsObject,
    ttsStopName?: TranslatedString.AsObject,
    stopDesc?: TranslatedString.AsObject,
    stopLat?: number,
    stopLon?: number,
    zoneId?: string,
    stopUrl?: TranslatedString.AsObject,
    parentStation?: string,
    stopTimezone?: string,
    wheelchairBoarding?: Stop.WheelchairBoardingMap[keyof Stop.WheelchairBoardingMap],
    levelId?: string,
    platformCode?: TranslatedString.AsObject,
  }

  export interface WheelchairBoardingMap {
    UNKNOWN: 0;
    AVAILABLE: 1;
    NOT_AVAILABLE: 2;
  }

  export const WheelchairBoarding: WheelchairBoardingMap;
}

export class TripModifications extends jspb.Message {
  clearSelectedTripsList(): void;
  getSelectedTripsList(): Array<TripModifications.SelectedTrips>;
  setSelectedTripsList(value: Array<TripModifications.SelectedTrips>): void;
  addSelectedTrips(value?: TripModifications.SelectedTrips, index?: number): TripModifications.SelectedTrips;

  clearStartTimesList(): void;
  getStartTimesList(): Array<string>;
  setStartTimesList(value: Array<string>): void;
  addStartTimes(value: string, index?: number): string;

  clearServiceDatesList(): void;
  getServiceDatesList(): Array<string>;
  setServiceDatesList(value: Array<string>): void;
  addServiceDates(value: string, index?: number): string;

  clearModificationsList(): void;
  getModificationsList(): Array<TripModifications.Modification>;
  setModificationsList(value: Array<TripModifications.Modification>): void;
  addModifications(value?: TripModifications.Modification, index?: number): TripModifications.Modification;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TripModifications.AsObject;
  static toObject(includeInstance: boolean, msg: TripModifications): TripModifications.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TripModifications, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TripModifications;
  static deserializeBinaryFromReader(message: TripModifications, reader: jspb.BinaryReader): TripModifications;
}

export namespace TripModifications {
  export type AsObject = {
    selectedTripsList: Array<TripModifications.SelectedTrips.AsObject>,
    startTimesList: Array<string>,
    serviceDatesList: Array<string>,
    modificationsList: Array<TripModifications.Modification.AsObject>,
  }

  export class Modification extends jspb.Message {
    hasStartStopSelector(): boolean;
    clearStartStopSelector(): void;
    getStartStopSelector(): StopSelector | undefined;
    setStartStopSelector(value?: StopSelector): void;

    hasEndStopSelector(): boolean;
    clearEndStopSelector(): void;
    getEndStopSelector(): StopSelector | undefined;
    setEndStopSelector(value?: StopSelector): void;

    hasPropagatedModificationDelay(): boolean;
    clearPropagatedModificationDelay(): void;
    getPropagatedModificationDelay(): number | undefined;
    setPropagatedModificationDelay(value: number): void;

    clearReplacementStopsList(): void;
    getReplacementStopsList(): Array<ReplacementStop>;
    setReplacementStopsList(value: Array<ReplacementStop>): void;
    addReplacementStops(value?: ReplacementStop, index?: number): ReplacementStop;

    hasServiceAlertId(): boolean;
    clearServiceAlertId(): void;
    getServiceAlertId(): string | undefined;
    setServiceAlertId(value: string): void;

    hasLastModifiedTime(): boolean;
    clearLastModifiedTime(): void;
    getLastModifiedTime(): number | undefined;
    setLastModifiedTime(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Modification.AsObject;
    static toObject(includeInstance: boolean, msg: Modification): Modification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Modification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Modification;
    static deserializeBinaryFromReader(message: Modification, reader: jspb.BinaryReader): Modification;
  }

  export namespace Modification {
    export type AsObject = {
      startStopSelector?: StopSelector.AsObject,
      endStopSelector?: StopSelector.AsObject,
      propagatedModificationDelay?: number,
      replacementStopsList: Array<ReplacementStop.AsObject>,
      serviceAlertId?: string,
      lastModifiedTime?: number,
    }
  }

  export class SelectedTrips extends jspb.Message {
    clearTripIdsList(): void;
    getTripIdsList(): Array<string>;
    setTripIdsList(value: Array<string>): void;
    addTripIds(value: string, index?: number): string;

    hasShapeId(): boolean;
    clearShapeId(): void;
    getShapeId(): string | undefined;
    setShapeId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SelectedTrips.AsObject;
    static toObject(includeInstance: boolean, msg: SelectedTrips): SelectedTrips.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SelectedTrips, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SelectedTrips;
    static deserializeBinaryFromReader(message: SelectedTrips, reader: jspb.BinaryReader): SelectedTrips;
  }

  export namespace SelectedTrips {
    export type AsObject = {
      tripIdsList: Array<string>,
      shapeId?: string,
    }
  }
}

export class StopSelector extends jspb.Message {
  hasStopSequence(): boolean;
  clearStopSequence(): void;
  getStopSequence(): number | undefined;
  setStopSequence(value: number): void;

  hasStopId(): boolean;
  clearStopId(): void;
  getStopId(): string | undefined;
  setStopId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopSelector.AsObject;
  static toObject(includeInstance: boolean, msg: StopSelector): StopSelector.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopSelector, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopSelector;
  static deserializeBinaryFromReader(message: StopSelector, reader: jspb.BinaryReader): StopSelector;
}

export namespace StopSelector {
  export type AsObject = {
    stopSequence?: number,
    stopId?: string,
  }
}

export class ReplacementStop extends jspb.Message {
  hasTravelTimeToStop(): boolean;
  clearTravelTimeToStop(): void;
  getTravelTimeToStop(): number | undefined;
  setTravelTimeToStop(value: number): void;

  hasStopId(): boolean;
  clearStopId(): void;
  getStopId(): string | undefined;
  setStopId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReplacementStop.AsObject;
  static toObject(includeInstance: boolean, msg: ReplacementStop): ReplacementStop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReplacementStop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReplacementStop;
  static deserializeBinaryFromReader(message: ReplacementStop, reader: jspb.BinaryReader): ReplacementStop;
}

export namespace ReplacementStop {
  export type AsObject = {
    travelTimeToStop?: number,
    stopId?: string,
  }
}

