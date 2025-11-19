import { alovaInstance } from "../../index";
import { AlovaResponse, system } from "../../../type/response-data";

//查询所有子系统
export const getSystems = () => {
  return alovaInstance.Get<AlovaResponse<system[]>>("/oauth/selectList");
};

//添加子系统
export const addSystems = (sys: system) => {
  return alovaInstance.Post<AlovaResponse<system[]>>("/oauth/add", sys);
};
//删除子系统
export const delSystems = (id: number) => {
  return alovaInstance.Delete<AlovaResponse<system[]>>(
    `/oauth/delete?id=${id}`
  );
};
//修改子系统
export const editSystems = (sys: system) => {
  return alovaInstance.Put<AlovaResponse<system[]>>("/oauth/update", sys);
};

//启用子系统
export const startSystems = (id: number) => {
  return alovaInstance.Post<AlovaResponse<system[]>>(`/oauth/enable?id=${id}`);
};
//禁用子系统
export const stopSystems = (id: number) => {
  return alovaInstance.Post<AlovaResponse<system[]>>(`/oauth/disable?id=${id}`);
};
