import { createApp, App as AppInstance } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router/routers";
import "./style.css";
import App from "./App.vue";
import "virtual:uno.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import { createWebHashHistory, RouterHistory, Router } from "vue-router";
import { getchildtoken } from "../src/api/methods/login";
import { useStore } from "../src/store/user";

declare global {
  interface Window {
    eventCenterForAppNameVite: any;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_ENVIRONMENT__: string;
    __MICRO_APP_BASE_APPLICATION__: string;
  }
}
//定义window 全局模式

// 与基座进行数据交互
const handleMicroData = async (router: Router) => {
  // eventCenterForAppNameVite 是基座添加到window的数据通信对象
  // @ts-ignore
  const data = window.microApp.getData(); // 返回主应用下发的data数据
  //确保一定有data
  // 请求获取 token 并将token 存储在store 中
  console.log(data.msg);

  let token = (await getchildtoken(data.msg)).data;
  const store = useStore();
  store.code = data.msg;
  store.childtoken = token;

  //刷新页面
  if (window.eventCenterForAppNameVite) {
    // 主动获取基座下发的数据
    console.log("child getData:", window.eventCenterForAppNameVite.getData());
    // 监听基座下发的数据变化
    window.eventCenterForAppNameVite.addDataListener(
      (data: Record<string, unknown>) => {
        console.log("child-vite addDataListener:", data);
        if (data.path && typeof data.path === "string") {
          data.path = data.path.replace(/^#/, "");
          // 当基座下发path时进行跳转
          if (data.path && data.path !== router.currentRoute.value.path) {
            router.push(data.path as string);
          }
        }
      }
    );
    // 向基座发送数据
    setTimeout(() => {
      window.eventCenterForAppNameVite.dispatch({ myname: "SignIn" });
    }, 3000);
  }
};

// 解决子应用 router4 冲突
// @ts-ignore
function fixBugForVueRouter4(router: Router) {
  // 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
  if (
    window.location.href.includes("/main-vue3") ||
    window.location.href.includes("/main-vite")
  ) {
    /**
     * 重要说明：
     * 1、这里主应用下发的基础路由为：`/main-xxx/app-vite`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vite`，不同项目根据实际情况调整
     *
     * 2、因为vite关闭了沙箱，又是hash路由，我们这里写死realBaseRoute为：/app-vite#
     */
    const realBaseRoute = "/app-vite#";
    router.beforeEach(() => {
      if (typeof window.history.state?.current === "string") {
        window.history.state.current = window.history.state.current.replace(
          new RegExp(realBaseRoute, "g"),
          ""
        );
      }
    });

    router.afterEach(() => {
      if (typeof window.history.state === "object") {
        window.history.state.current =
          realBaseRoute + (window.history.state.current || "");
      }
    });
  }
}

// 使用 umd 模式

let app: AppInstance | null = null;

let history: RouterHistory | null = null;

function mount() {
  history = createWebHashHistory();

  app = createApp(App);
  app.use(router);

  const pinia = createPinia();
  app.use(pinia);
  app.use(ElementPlus, {
    locale: zhCn,
  });

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  pinia.use(piniaPluginPersistedstate);
  app.mount("#vite-app");
  console.log("微应用child-vite渲染了");

  handleMicroData(router);

  // fixBugForVueRouter4(router);
}

// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount();
  history?.destroy();
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener();
  app = null;
  history = null;
  console.log("微应用child-system卸载了");
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  console.log("在微前端环境下");
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
} else {
  mount();
}
