import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";
export const getdepartmentId = () => {
  return alovaInstance.Get<AlovaResponse<any>>("/getDepartment", {
    shareRequest: false,
  });
};
