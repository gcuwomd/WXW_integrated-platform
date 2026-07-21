import { alovaInstance } from "../../index";
import { AlovaResponse, permissionGroup,addPermissionGroup } from "../../../type/response-data";

export const getPermissionGroups = () => {
    return alovaInstance.Get<AlovaResponse<permissionGroup[]>>("/permissionGroups/get", {
      shareRequest: false,
    });
  };

  export const AddPermissionGroup = (formdata: addPermissionGroup) => {
    return alovaInstance.Post<AlovaResponse<string | null>>("/permissionGroups/add",formdata);
  };

  export const delPermissionGroup = (id: number) => {
    return alovaInstance.Delete<AlovaResponse<string | null>>(
      `/permissionGroups/delete?permissionGroupsId=${id}`,
      {
        shareRequest: false,
      }
    );
  };

  export const getPermissionGroupsById = (id:string) => {
    return alovaInstance.Get<AlovaResponse<any>>(`/permissions/getByGroupId?groupId=${id}`, {
      shareRequest: false,
    });
  };