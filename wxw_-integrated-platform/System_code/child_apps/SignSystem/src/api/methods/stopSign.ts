import { alovaInstance } from "..";
import { AlovaResponse } from "../../type/response-data";
export const stopSign = (actName: string) => {
  return alovaInstance.Post<AlovaResponse<any>>("/signin/stopSignin", {
    activityName: actName,
  });
};
