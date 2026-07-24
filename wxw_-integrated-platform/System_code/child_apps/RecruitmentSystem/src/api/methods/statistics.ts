import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

interface DepartmentDataResponse {
  total: number;
  department: {
    type: string;
    value: number;
  }[];
}

export const getDepartmentData = (departmentId: number) => {
  return alovaInstance.Get<AlovaResponse<DepartmentDataResponse>>(
    `/user/departmentData?departmentId=${departmentId}`,
    {}
  );
};
