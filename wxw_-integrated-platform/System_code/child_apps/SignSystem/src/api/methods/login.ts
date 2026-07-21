import { alovaInstance } from "..";
import { AlovaResponse } from "../../type/response-data";
export const getchildtoken = (code: string) => {
  return alovaInstance.Post<AlovaResponse<string>>(`/login`, {
    code: code,
    shareRequest: false,
  });
};

//code 获取token
