import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";

interface DepartmentIdResponse {
  data: {
    departmentId: string;
  };
}

export const getDepartmentId = () => {
  return alovaInstance.Get<AlovaResponse<DepartmentIdResponse>>(
    "/getDepartment",
    {}
  );
};
