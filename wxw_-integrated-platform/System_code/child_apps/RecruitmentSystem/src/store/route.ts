import { defineStore } from "pinia";
import { ref } from "vue";
import { menuprop } from "../type/response-data";
//用户属性
export const routeStore = defineStore(
  "route",
  () => {
    const menuList = ref<menuprop[]>([
      {
        name: "人数统计",
        path: "/ReviewSituation",
        component: "ReviewSituation",
        icon: null,
        meta: {
          title: "人数统计",
        },
        children: [
          {
            name: "饼状图",
            component: "Fan",
            icon: null,
            path: "Fan",
            meta: {
              title: "饼状图",
            },
            children: [],
          },
          {
            name: "直方图",
            component: "Histogram",
            path: "Histogram",
            icon: null,
            meta: {
              title: "直方图",
            },
            children: [],
          },
        ],
      },
      {
        name: "报名情况",
        component: "SignSituation",
        icon: null,
        path: "/SignSituation",
        meta: {
          title: "报名情况",
        },
        children: [],
      },
      {
        name: "审核情况",
        path: "/Statistics",
        icon: null,
        component: "Statistics",
        meta: {
          title: "审核情况",
        },
        children: [
          {
            name: "未通过人员信息",
            component: "Nopass",
            path: "Nopass",
            icon: null,
            meta: {
              title: "未通过人员信息",
            },
            children: [],
          },
          {
            name: "通过人员信息",
            component: "Pass",
            icon: null,
            path: "Pass",
            meta: {
              title: "通过人员信息",
            },
            children: [],
          },
          {
            name: "未处理人员信息",
            component: "Willpass",
            icon: null,
            path: "Willpass",
            meta: {
              title: "未处理人员信息",
            },
            children: [],
          },
        ],
      },
    ]);
    return { menuList };
  },
  {
    persist: {
      key: "Recruitment-route",
      storage: localStorage,
    },
  }
);
