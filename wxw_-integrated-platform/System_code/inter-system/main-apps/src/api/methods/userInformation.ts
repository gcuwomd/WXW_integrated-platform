// 用户信息
import { alovaInstance } from "..";
import {
  AlovaResponse,
  userList,
  updateUserList,
  supple,
} from "../../type/respon-data";

//用户信息列表

// 主系统 token 获取用户信息

export const getUserInformation = () => {
  return alovaInstance.Get<AlovaResponse<userList>>("/user/information", {});
};

//更新用户信息

export const updateUserInformation = (user: updateUserList) => {
  return alovaInstance.Put<AlovaResponse<any>>("/user/update", user);
};

// 补充用户信息  初次登录补充 部门信息
export const supplementInformation = (information: supple) => {
  return alovaInstance.Post<AlovaResponse<string>>(
    "/InformationSupplement",
    information
  );
};
