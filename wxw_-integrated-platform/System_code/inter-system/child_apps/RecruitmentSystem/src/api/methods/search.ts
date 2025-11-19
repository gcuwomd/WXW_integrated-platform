import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

export const search = (val: string) => {
  return alovaInstance.Get<AlovaResponse<any>>("/user/info/person", {
    shareRequest: false,
    params: {
      organizationId: 1,
      key: val,
    },
  });
};
