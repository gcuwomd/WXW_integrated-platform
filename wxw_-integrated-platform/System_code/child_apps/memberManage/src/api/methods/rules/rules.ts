import { alovaInstance } from "../..";
import {
  AlovaResponse,
  indicatorslist,
  addIndicators,
  editIndicators,
  delIndicators,
  userEvalute,
} from "../../../type/response-data";

// 获取细则列表的方法
export const getRules = (activityId?:number) => {
  return alovaInstance.Get<AlovaResponse<indicatorslist[]>>(`/indicators/get?activityId=${activityId}`);
};

// 添加细则的方法
export const addRules = (body: addIndicators) => {
  return alovaInstance.Post<AlovaResponse<string>>("/indicators/add", body);
};

// 更改细则的方法
export const editRules = (body: editIndicators) => {
  return alovaInstance.Post<AlovaResponse<string>>("/indicators/update", body);
};

export const delRules = (body: delIndicators) => {
  return alovaInstance.Delete<AlovaResponse<null>>("/indicators/delete", body);
};

// 查询活动相关细则
export const getRulesByact = (activityId: number) => {
  return alovaInstance.Get<AlovaResponse<indicatorslist[]>>(
    "/indicators/getIndicatorsByActivityId",
    { params: { activityId } }
  );
};

//获取 某学生所有评分
export const getUserIndicatorsByUserId = (userId: number) => {
  return alovaInstance.Get<AlovaResponse<userEvalute[]>>(
    `/indicators/getUserIndicatorsByUserId?userId=${userId}`
  );
};
