import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

export const subNext = (id: string) => {
  return alovaInstance.Post<AlovaResponse<string>>("/user/nextDepartment", {
    id: id,
  });
};
