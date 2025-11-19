//权限
import { alovaInstance } from "../../index";
import { AlovaResponse, permission } from "../../../type/response-data";

export const getPermissionList = () => {
  return alovaInstance.Get<AlovaResponse<permission[]>>("/permissions/get", {
    shareRequest: false,
  });
};

export const AddPermission = (formdata: any) => {
  return alovaInstance.Post<AlovaResponse<string | null>>("/permissions/add ", {
    name: formdata.name,
    perms: formdata.perms,
    shareRequest: false,
  });
};

export const EditPermission = (formdata: any) => {
  return alovaInstance.Put<AlovaResponse<string | null>>(
    "/permissions/update",
    {
      shareRequest: false,
      id: formdata.id,
      name: formdata.name,
      perms: formdata.perms,
      status: Number(formdata.status),
    }
  );
};
export const delPermission = (id: string) => {
  return alovaInstance.Delete<AlovaResponse<string | null>>(
    `/permissions/delete?permissionId=${id}`,
    {
      shareRequest: false,
    }
  );
};
