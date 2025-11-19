// 部门信息
import { alovaInstance } from "..";
import { AlovaResponse, roleList } from "../../type/respon-data";

// 获取主系统 token
export const getrolelist = () => {
  return alovaInstance.Get<AlovaResponse<roleList[]>>("/roles/get", {});
};
