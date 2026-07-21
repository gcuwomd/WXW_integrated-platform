import { alovaInstance } from "..";
import { AlovaResponse, meeting } from "../../type/response-data";
export const getSignDetail = (actName: string) => {
  return alovaInstance.Get<AlovaResponse<meeting>>(
    `/signin/signinDetail?activityName=${actName}`,
    {
      shareRequest: false,
    }
  );
};
