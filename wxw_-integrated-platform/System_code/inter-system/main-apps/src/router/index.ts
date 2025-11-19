// import { storeToRefs } from "pinia";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Integration from "../views/integration.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import NotFound from "../views/notfound.vue";
import Personal from "../views/personal.vue";
import Childsystem from "../views/childsystem.vue";
import Maintenance from "../views/maintenance.vue";

import { useRequest } from "alova";
import { gettoken } from "../api/methods/gettoken";
import { useStore } from "../store/user";
import { debouncedShowMessage } from "../../src/utils/debounce.ts";
// import App from "../App.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/integration",
    component: Integration,
    name: "集成系统",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "注册",
    },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
  {
    path: "/personal",
    name: "Personal",
    component: Personal,
    meta: {
      title: "个人",
    },
  },
  {
    path: "/childsystem",
    name: "Childsystem",
    component: Childsystem,
    meta: {
      title: "子系统",
    },
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    component: Maintenance,
    meta: {
      title: "系统维护中",
    },
  },

  //   {
  //     path: "/:catchAll(.*)",
  //     component: NotFound,
  //   },
  //   {
  //     path: "/500",
  //     name: "ServerError",
  //     component: SeverError,
  //   },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
// 设置路由守卫
// @ts-ignore
router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.path == "/login") {
    // App.toggleOverlay();
    const code = to.query.code as string;
    //获取token
    if (code) {
      getToken(code)
        .then(() => {
          next();
        })
        .catch(() => {
          next({ path: "/login" });
        });
    }
  } else if (!store.token) {
    next({ path: "/login" });
  } else if (to.path == "/" || to.path == "") {
    next({ path: "/integration" });
  }
  next();
});

//获取主系统token
const getToken = async (code: string) => {
  const store = useStore();
  if (code) {
    updatelogin(code);
    store.code = code;
  }
};

// 登录请求
const { onSuccess: loginSuccess, send: updatelogin } = useRequest(
  (code: string) => gettoken(code),
  {
    // force: (shouldUpdate: boolean) => shouldUpdate,
    immediate: false,
  }
);
loginSuccess((response: any) => {
  const store = useStore();
  if (response.data.code == 200) {
    store.token = response.data.data;
    router.push("/integration");
    debouncedShowMessage("登录成功", "success");
    //登录成功 获取用户信息 部门和姓名 存在 store
  } else if (response.data.code == 401) {
    store.token = response.data.data; // 存储一份 补充完信息 要更新
    router.push("/register");
    debouncedShowMessage("登录成功，请完善信息", "success");
  } else {
    debouncedShowMessage("登录失败", "error");
  }
});

export default router;
