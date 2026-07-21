import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

import { useStore } from "../../store/user";
const useUser = useStore();

interface DepartmentDataResponse {
  total: number;
  department: {
    type: string;
    value: number;
  }[];
}

export const getDepartmentData = () => {
  return alovaInstance.Get<AlovaResponse<DepartmentDataResponse>>(
    `/user/departmentData?departmentId=${useUser.departmentId}`,
    {}
  );
};
