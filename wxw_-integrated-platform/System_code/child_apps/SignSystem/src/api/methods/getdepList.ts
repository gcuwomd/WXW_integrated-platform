import { alovaInstance } from "..";
import {
  AlovaResponse,
  departmentList,
  depmemberlist,
} from "../../type/response-data";
//获取部门列表

export const getDepList = () => {
  return alovaInstance.Get<AlovaResponse<departmentList[]>>(
    "/departments/get",
    {
      shareRequest: false,
    }
  );
};

//获取部门对应人员列表
export const getDepmenList = (departmentId: number) => {
  return alovaInstance.Get<AlovaResponse<depmemberlist[]>>(
    `/departments/getDetail?departmentId=${departmentId}`,
    {
      shareRequest: false,
    }
  );
};
