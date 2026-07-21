import { alovaInstance } from "../..";
import { activityInter } from "../../../type/request-data";
import { AlovaResponse } from "../../../type/response-data";

interface data {
  activityId: number;
  userId: number[];
}
// 为活动添加成员
export const addMember = (formdata: data) => {
  return alovaInstance.Post<AlovaResponse<any>>(
    "/activity/addPeople",
    formdata
  );
};

//根据活动id获取成员
export const getPeople = (actId: number) => {
  return alovaInstance.Get<AlovaResponse<any>>(
    "/activity/getActivityUserByActivityId",
    {
      params: {
        activityId: actId,
      },
    }
  );
};

//删除活动成员
export const delMember = (actId: number, userId: number[]) => {
  return alovaInstance.Delete<AlovaResponse<any>>("/activity/deletePeople", {
    activityId: actId,
    userId: userId,
  });
};

//获取活动
export const getActivity = () => {
  return alovaInstance.Get<AlovaResponse<activityInter[]>>("/activity/get");
};

//添加活动
export const addActivity = (formdata: any) => {
  return alovaInstance.Post<AlovaResponse<any>>("/activity/add", formdata);
};

//删除活动
export const deleteActivity = (activityId: number) => {
  return alovaInstance.Delete<AlovaResponse<null>>(
    `/activity/delete?activityId=${activityId}`
  );
};

//获取学年
export const getYear = () => {
  return alovaInstance.Get<AlovaResponse<any[]>>("/year/get");
};

//添加学年
export const addYear = () => {
  return alovaInstance.Post<AlovaResponse<any>>("/year/add");
};

//绑定活动与评分
export const bindIndicator = (activityId: number, indicatorsId: number[]) => {
  return alovaInstance.Post<AlovaResponse<any>>("/activity/bindingIndicators", {
    activityId: activityId,
    indicatorsId: indicatorsId,
  });
};

//取消绑定活动与评分
export const delbindIndicator = (
  activityId: number,
  indicatorsId: number[]
) => {
  return alovaInstance.Delete<AlovaResponse<any>>(
    `/activity/deleteBinding?activityId=${activityId}&indicatorsId=${indicatorsId}`
  );
};
