import { defineStore } from "pinia";
import { ref } from "vue";
import { menuprop } from "../type/response-data";
//用户属性
export const routeStore = defineStore(
  "route",
  () => {
    const menuList = ref<menuprop[]>([
      {
        name: "成员评价",
        component: "Evaluate",
        path: "evaluate",
        icon: null,
        meta: {
          title: "成员评价",
        },
        children: [],
      },
      {
        name: "成员信息",
        component: "Member",
        path: "member",
        icon: null,
        meta: {
          title: "成员信息",
        },
        children: [],
      },
      {
        name: "评价详情",
        component: "EvaluateDetail",
        path: "detail",
        icon: null,
        meta: {
          title: "评价详情",
        },
        children: [],
      },
      {
        name: "个人某活动评价详情",
        component: "PerEvaluateDetail",
        path: "perEvaluatedetail",
        icon: null,
        meta: {
          title: "个人某活动评价详情",
        },
        children: [],
      },
      {
        name: "权限管理",
        component: "Role",
        path: "role",
        icon: null,
        meta: {
          title: "权限管理",
        },
        children: [
          {
            name: "权限组",
            path: "PermissionGroup",
            component: "PermissionGroup",
            icon: null,
            meta: {
              title: "权限组",
            },
            children: [],
          },
          {
            path: "Permission",
            name: "权限模块",
            component: "Permission",
            icon: null,
            meta: {
              title: "权限模块",
            },
            children: [],
          },
        ],
      },
      {
        name: "子系统管理",
        component: "SystemManage",
        path: "system",
        icon: null,
        meta: {
          title: "子系统管理",
        },
        children: [],
      },
      {
        name: "活动管理",
        component: "Activity",
        path: "activity",
        icon: null,
        meta: {
          title: "活动管理",
        },
        children: [
          {
            name: "活动列表管理",
            path: "ActivityManage",
            component: "ActivityManage",
            icon: null,
            meta: {
              title: "权限组",
            },
            children: [],
          },
          {
            component: "RulesManage",
            path: "RulesManage",
            name: "细则管理",
            icon: null,
            meta: {
              title: "细则管理",
            },
            children: [],
          },
          {
            component: "ActivityDetails",
            path: "ActivityDetails",
            name: "活动详情",
            icon: null,
            meta: {
              title: "活动详情",
            },
            children: [
              {
                component: "Assessment",
                path: "Assessment",
                name: "考核管理",
                icon: null,
                meta: {
                  title: "考核管理",
                },
              },
              {
                component: "ActivityList",
                path: "ActivityList",
                name: "成员名单",
                icon: null,
                meta: {
                  title: "成员名单",
                },
              },
              {
                component: "Bind",
                path: "Bind",
                name: "评分绑定",
                icon: null,
                meta: {
                  title: "评分绑定",
                },
              }
            ],
          },
        ],
      },
    ]);
    return { menuList };
  },
  {
    persist: {
      key: "sign-user",
      storage: sessionStorage,
    },
  }
);
