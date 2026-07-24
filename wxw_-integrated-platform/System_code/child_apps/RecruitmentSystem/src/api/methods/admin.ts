import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

export const admin = (val: number, pageSize: number = 10) => {
  return alovaInstance.Get<AlovaResponse<any>>("/user/info/all", {
    shareRequest: false,
    params: {
      page: val,
      pageSize,
    },
  });
};
