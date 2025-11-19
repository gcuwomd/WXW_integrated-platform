import { alovaInstance } from "..";
import { AlovaResponse } from "../../type/response-data";

export const delAct = (signid: string) => {
  return alovaInstance.Post<AlovaResponse<string>>("/signin/delAct", {
    activityName: signid,
  });
};
