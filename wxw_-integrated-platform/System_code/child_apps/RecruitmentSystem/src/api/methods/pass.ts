import { alovaInstance } from "../index";
import { AlovaResponse, passArray } from "../../type/response-data";
import { useStore } from "../../store/user";
const useUser = useStore();
export const pass = () => {
  return alovaInstance.Get<AlovaResponse<passArray[]>>(
    `/user/pass?departmentId=${useUser.departmentId}`,
    {
      shareRequest: false,
    }
  );
};
