import http from "../http-common";
import { IDeliveryData } from "../types/Delivery";

const getAll = () => {
  return http.get<Array<IDeliveryData>>("/deliveries");
};

const get = (id: any) => {
  return http.get<IDeliveryData>(`/deliveries/${id}`);
};

const create = (data: any) => {
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return http.post<IDeliveryData>("/deliveries", { payload: data });
};

const update = (id: any, data: IDeliveryData) => {
  return http.put<any>(`/deliveries/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/deliveries/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/deliveries`);
};

const findByID = (id: string) => {
  return http.get<IDeliveryData>(`/deliveries/${id}`);
};

const DeliveryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByID,
};

export default DeliveryService;
