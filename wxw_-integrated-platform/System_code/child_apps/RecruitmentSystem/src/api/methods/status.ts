import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

export const changepass = (id: string, status: string) => {
  return alovaInstance.Post<AlovaResponse<string>>("/user/status", {
    id: id,
    status: status,
    shareRequest: false,
  });
};
