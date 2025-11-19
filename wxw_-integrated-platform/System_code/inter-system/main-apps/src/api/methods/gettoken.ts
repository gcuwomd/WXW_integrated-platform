import { alovaInstance } from "..";
import { AlovaResponse } from "../../type/respon-data";

// 获取主系统 token
export const gettoken = (code: string) => {
  return alovaInstance.Post<AlovaResponse<string>>("/login", {
    code: code,
  });
};
