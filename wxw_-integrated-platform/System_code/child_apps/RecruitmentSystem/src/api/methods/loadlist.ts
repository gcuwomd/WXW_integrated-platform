import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

export const Loadlist = () => {
  return alovaInstance.Get<AlovaResponse<any>>("/download/excel", {
    shareRequest: false,
  });
};
