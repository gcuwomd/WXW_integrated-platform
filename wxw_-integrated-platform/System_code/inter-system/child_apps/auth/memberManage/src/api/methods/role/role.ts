import { alovaInstance } from "../..";
import { InfoUserToPut } from "../../../type/request-data";
import { AlovaResponse, InfoUser } from "../../../type/response-data";

// 获取角色列表的方法
export const getRoles = () => {
  return alovaInstance.Get<AlovaResponse<InfoUser[]>>("/admin/informationUser");
};

// 更新角色的方法
export const updateRole = (roleData: InfoUserToPut) => {
  return alovaInstance.Put<AlovaResponse<string>>(
    "/admin/updateUser",
    roleData
  );
};

// 删除角色的方法
export const deleteRole = (userId: string) => {
  return alovaInstance.Delete<AlovaResponse<null>>(
    `/admin/deleteUser?userId=${userId}`
  );
};

// 添加角色
// export const addRole = (roleData: InfoUserToPut) => {
//   return alovaInstance.Post<AlovaResponse<string>>("/admin/addUser", roleData);
// };
