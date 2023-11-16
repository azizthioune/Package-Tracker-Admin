import http from "../http-common";
import { IPackageData } from "../types/Package";

const getAll = () => {
  return http.get<Array<IPackageData>>("/packages");
};

const get = (id: any) => {
  return http.get<IPackageData>(`/packages/${id}`);
};

const create = (data: IPackageData) => {
  return http.post<IPackageData>("/packages", { payload: data });
};

const update = (id: any, data: IPackageData) => {
  return http.put<any>(`/packages/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/packages/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/packages`);
};

const findByID = (id: string) => {
  return http.get<IPackageData>(`/packages/${id}`);
};

const PackageService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByID,
};

export default PackageService;
