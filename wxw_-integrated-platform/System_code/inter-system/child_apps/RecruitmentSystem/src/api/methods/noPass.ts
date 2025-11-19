import { alovaInstance } from "../index";
import { AlovaResponse, passArray } from "../../type/response-data";
import { useStore } from "../../store/user";
const useUser = useStore();

export const nopass = () => {
  return alovaInstance.Get<AlovaResponse<passArray[]>>(
    `/user/noPass?departmentId=${useUser.departmentId}`,
    {
      shareRequest: false,
    }
  );
};
