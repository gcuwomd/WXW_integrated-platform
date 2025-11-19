import { defineStore } from "pinia";

import { type InfoUser, permission, userEvalute } from "../type/response-data";
export const useAppStore = defineStore("app", () => {
  const userInfos = ref<InfoUser[]>([]);
  const evaluateInfos = ref<userEvalute[]>([]); // 存储全部评分信息 前端进行 分部门 分年份

  //获取 local中的token
  const integrationUser = localStorage.getItem("integration-user");
  const initialToken = integrationUser
    ? JSON.parse(integrationUser).token
    : undefined;
  const access_token = ref<string>(initialToken);

  //initialToken
  const roleList = ref<permission[]>([]);
  const activityName = ref<string>("");
  const activityId = ref<number>(0);
  return {
    userInfos,
    access_token,
    roleList,
    activityName,
    activityId,
    evaluateInfos,
  };
});
