console.log("[memberManage] main.ts 模块加载");
import { createApp, App as AppInstance } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn.mjs";
//顶部页面加载条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import { RouterHistory, Router } from "vue-router";
import { useAppStore } from "./store/index";

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});
//路由监听
router.beforeEach((_to, _from, next) => {
  NProgress.start();
  next();
});
//路由跳转结束
router.afterEach(() => {
  NProgress.done();
});

declare global {
  interface Window {
    eventCenterForAppNameVite: any;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_ENVIRONMENT__: string;
    __MICRO_APP_BASE_APPLICATION__: string;
  }
}

// 与基座进行数据交互
// 适配后端网关架构：子应用直接使用主应用传递的 Token
const handleMicroData = async (_router: Router) => {
  const store = useAppStore();

  // 处理从主应用接收到的数据
  const processData = (data: any) => {
    if (!data) return;
    console.log("Member-Manage 收到主应用数据:", data);
    if (data.token) {
      store.access_token = data.token;
      console.log("Member-Manage Token 已设置");
    }
  };

  // 1. 先尝试同步获取（主应用在 beforemount 已发送，通常能获取到）
  // @ts-ignore
  const data = window.microApp.getData();
  console.log("Member-Manage getData:", data);
  processData(data);

  // 2. 同时监听后续数据更新（兜底：如果 beforemount 时数据还未到达）
  // @ts-ignore
  window.microApp.addDataListener((newData: any) => {
    console.log("Member-Manage addDataListener 收到数据:", newData);
    processData(newData);
  });
};

let app: AppInstance | null = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let _history: RouterHistory | null = null; // 保留用于微前端卸载

function mount() {
  console.log("[memberManage] mount() 开始执行");
  _history = router.options.history;

  console.log("[memberManage] 创建 Vue 应用...");
  app = createApp(App);
  const pinia = createPinia();
  app.use(router);
  app.use(pinia);
  app.use(ElementPlus, {
    locale: zhCn,
  });

  pinia.use(piniaPluginPersistedstate);
  console.log("[memberManage] 挂载到 #app...");
  app.mount("#app");
  console.log("[memberManage] 微应用 Permission 渲染了");

  console.log("[memberManage] 调用 handleMicroData...");
  handleMicroData(router);
  console.log("[memberManage] mount() 执行完毕");
}

// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount();
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener();
  app = null;
  _history = null;
  console.log("微应用 Permission 卸载了");
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  console.log("[memberManage] 在微前端环境下, appName=", window.__MICRO_APP_NAME__);
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
  console.log("[memberManage] mount/unmount 已注册到 window[micro-app-" + window.__MICRO_APP_NAME__ + "]");
} else {
  console.log("[memberManage] 非微前端环境，直接 mount");
  mount();
}
