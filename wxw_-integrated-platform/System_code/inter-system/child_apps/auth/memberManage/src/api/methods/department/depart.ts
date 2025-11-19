import { alovaInstance } from "../..";
import {
  AlovaResponse,
  department,
  departmentMember,
} from "../../../type/response-data";

// 获取部门列表
export const getDepList = () => {
  return alovaInstance.Get<AlovaResponse<department[]>>(`/departments/get`);
};

//获取部门对应人员列表
export const getDepMemberList = (departmentId: number) => {
  return alovaInstance.Get<AlovaResponse<departmentMember[]>>(
    `/departments/getDetail?departmentId=${departmentId}`
  );
};
