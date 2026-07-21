import { alovaInstance } from "../..";
import { AlovaResponse, InfoUser } from "../../../type/response-data";

// 获取部门所有人员信息
export const getAllInformation = (departmentId: number) => {
  return alovaInstance.Get<AlovaResponse<InfoUser[]>>(
    `/user/allInformation?departmentId=${departmentId}`
  );
};
