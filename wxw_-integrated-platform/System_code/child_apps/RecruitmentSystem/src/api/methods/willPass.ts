import { alovaInstance } from "../index";
import { AlovaResponse, passArray } from "../../type/response-data";

import { useStore } from "../../store/user";
const useUser = useStore();
export const willpass = () => {
  return alovaInstance.Get<AlovaResponse<passArray[]>>(
    `/user/willPass?departmentId=${useUser.departmentId}`,
    {
      shareRequest: false,
    }
  );
};
