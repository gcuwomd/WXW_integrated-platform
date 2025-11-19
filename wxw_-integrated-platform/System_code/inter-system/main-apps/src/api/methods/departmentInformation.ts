// 部门信息
import { alovaInstance } from "..";
import { AlovaResponse, departmentList } from "../../type/respon-data";

// 获取主系统 token
export const getdepartmentlist = () => {
  return alovaInstance.Get<AlovaResponse<departmentList[]>>(
    "/departments/get",
    {}
  );
};
