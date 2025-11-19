import { alovaInstance } from "../..";
import { AlovaResponse } from "../../../type/response-data";

// 获取年份
export const getYear = () => {
  return alovaInstance.Get<AlovaResponse<string[]>>(`/year/get`);
};
