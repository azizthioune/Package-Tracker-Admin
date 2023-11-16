import { IPackageData } from "./Package";

export enum DeliveryStatus {
  Open = "OPEN",
  PickedUp = "PICKEDUP",
  InTransit = "INTRANSIT",
  Delivered = "DELIVERED",
  Failed = "FAILED",
}

export interface IDeliveryData {
  _id?: string;
  delivery_uid?: string;
  status?: DeliveryStatus;
  created_at?: string;
  last_edited_at?: string;
  package?: IPackageData;
}
