// 部门信息
import { alovaInstance } from "..";
import { AlovaResponse, departmentList } from "../../type/respon-data";

// 获取部门列表
// 网关路由：/permission/departments/get → permission 服务 /departments/get
export const getdepartmentlist = () => {
  return alovaInstance.Get<AlovaResponse<departmentList[]>>(
    "/permission/departments/get",
    {}
  );
};
