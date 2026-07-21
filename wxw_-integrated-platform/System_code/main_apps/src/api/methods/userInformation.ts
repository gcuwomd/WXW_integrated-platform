// 用户信息
import { alovaInstance } from "..";
import {
  AlovaResponse,
  userList,
  updateUserList,
  supple,
} from "../../type/respon-data";

// 获取用户信息
// 网关路由：/permission/user/information → permission 服务 /user/information
export const getUserInformation = () => {
  return alovaInstance.Get<AlovaResponse<userList>>("/permission/user/information", {});
};

// 更新用户信息
// 网关路由：/permission/user/update → permission 服务 /user/update
export const updateUserInformation = (user: updateUserList) => {
  return alovaInstance.Put<AlovaResponse<any>>("/permission/user/update", user);
};

// 补充用户信息  初次登录补充 部门信息
// 网关路由：/permission/InformationSupplement → permission 服务 /InformationSupplement
export const supplementInformation = (information: supple) => {
  return alovaInstance.Post<AlovaResponse<string>>(
    "/permission/InformationSupplement",
    information
  );
};
