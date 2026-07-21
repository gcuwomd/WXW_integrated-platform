import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

export const getassess = (id: string) => {
    return alovaInstance.Get<AlovaResponse<any>>(`/comment?id=${id}`, {
      shareRequest: false,
    });
  };
  