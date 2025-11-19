import { alovaInstance } from "..";
import { AlovaResponse, signList } from "../../type/response-data";
export const getSignList = () => {
  return alovaInstance.Get<AlovaResponse<signList[]>>("/signin/signinList", {
    shareRequest: false,
  });
};
//获取用户
export const getpersonSignList = () => {
  return alovaInstance.Get<AlovaResponse<signList[]>>(
    "/signin/signinUserList",
    {
      shareRequest: false,
    }
  );
};
