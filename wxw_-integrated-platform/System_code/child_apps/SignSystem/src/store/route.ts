import { defineStore } from "pinia";
import { ref } from "vue";
import { menuprop } from "../type/response-data";
//用户属性
export const routeStore = defineStore(
  "route",
  () => {
    const menuList = ref<menuprop[]>([
      {
        name: "签到信息",
        component: "SignInInfo",
        path: "signInInfo",
        icon: null,
        meta: {
          title: "签到信息",
        },
        children: [],
      },
      {
        name: "签到具体信息",
        component: "SignDetail",
        path: "signDetail",
        icon: null,
        meta: {
          title: "签到具体信息",
        },
        children: [],
      },
      {
        name: "发起签到",
        component: "SignInInitiate",
        path: "signInInitiate",
        icon: null,
        meta: {
          title: "发起签到",
        },
        children: [],
      },
    ]);
    return { menuList };
  },
  {
    persist: {
      key: "sign-user",
      storage: localStorage,
    },
  }
);
