//子系统
import { alovaInstance } from "..";
import { AlovaResponse, system } from "../../type/respon-data";

// 获取子系统列表
export const getsystemList = () => {
  return alovaInstance.Get<AlovaResponse<system[]>>("/oauth/selectList");
};

// 获取子系统code
export const getchildcode = (clientId: string, id: string) => {
  return alovaInstance.Get<AlovaResponse<string>>(
    `/oauth/redirect?clientId=${clientId}&id=${id}`
  );
};

// 获取子系统token 参数： code clientId clientSecret
export const getchildtoken = (
  code: string,
  clientId: string,
  clientSecret: string
) => {
  return alovaInstance.Post<AlovaResponse<string>>("/oauth/token", {
    code: code,
    clientId: clientId,
    clientSecret: clientSecret,
  });
};
