import { alovaInstance } from "..";
import { formtype } from "../../type/request-data";
//创建签到
export const creatSign = (form: formtype) => {
  return alovaInstance.Post(`/signin/createSignin`, form, {
    shareRequest: false,
  });
};
