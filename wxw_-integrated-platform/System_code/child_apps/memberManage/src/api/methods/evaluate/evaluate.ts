import { alovaInstance } from "../..";
import { submitScore } from "../../../type/request-data";
import {
  AlovaResponse,
  userActEvalute,
  userEvalute,
  indicatorslist,
} from "../../../type/response-data";

// 获取活动评分细则  一个活动 一个细则
export const getActEvalute = (activityId: number) => {
  return alovaInstance.Get<AlovaResponse<indicatorslist>>(
    `/indicators/getIndicatorsByActivityId?activityId=${activityId}`
  );
};

//提交评分及建议
export const submitEvalute = (formdata: submitScore) => {
  return alovaInstance.Put<AlovaResponse<string | null>>(
    "/activity/score",
    formdata
  );
};

// 获取某一学年所有人员的学年总分  //  年份可以不传 传了就是 当年的
export const getEvalute = (year: number | null) => {
  const url =
    year !== null
      ? `/indicators/getUserIndicators?year=${year}`
      : `/indicators/getUserIndicators`;

  return alovaInstance.Get<AlovaResponse<userEvalute[]>>(url);
};

//获取 某人某年的所有活动总分，状态
export const getPreEvaluteByUser = (userId: number, year: number) => {
  return alovaInstance.Get<AlovaResponse<userActEvalute[]>>(
    `/indicators/getUserIndicators?userId=${userId}&year=${year}`
  );
};
