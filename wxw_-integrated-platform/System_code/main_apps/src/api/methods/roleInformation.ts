// 角色信息
import { alovaInstance } from "..";
import { AlovaResponse, roleList } from "../../type/respon-data";

// 获取角色列表
// 网关路由：/permission/roles/get → permission 服务 /roles/get
export const getrolelist = () => {
  return alovaInstance.Get<AlovaResponse<roleList[]>>("/permission/roles/get", {});
};
