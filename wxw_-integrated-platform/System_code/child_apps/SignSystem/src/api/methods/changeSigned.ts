import { alovaInstance } from "..";
import { AlovaResponse } from "../../type/response-data";

export const changeSigned = (signid: string, activityName: string) => {
  return alovaInstance.Post<AlovaResponse<string>>(
    "/signin/changeUserSignInStatus1",
    {
      id: signid,
      activityName: activityName,
      shareRequest: false,
    }
  );
};

export const changeUnSigned = (signid: string, activityName: string) => {
  return alovaInstance.Post<AlovaResponse<string>>(
    "/signin/changeUserSignInStatus0",
    {
      id: signid,
      activityName: activityName,
      shareRequest: false,
    }
  );
};
