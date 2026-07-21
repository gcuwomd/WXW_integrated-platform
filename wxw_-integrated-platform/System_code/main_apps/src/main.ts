import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "../src/router/index";

import "./style.css";
import App from "./App.vue";

import "virtual:uno.css";

import ElementPlus from "element-plus";

import zhCn from "element-plus/es/locale/lang/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";

import microApp from "@micro-zoe/micro-app";

microApp.start({
  iframe: true,
  "disable-memory-router": false, // 关闭虚拟路由系统
  "disable-patch-request": true, // 关闭对子应用请求的拦截
  // "router-mode": "search", // 所有子应用都设置为search模式
  plugins: {},
});

// 子应用 preFetch 配置
// 开发环境下使用本地 Vite dev server，生产环境使用部署域名
// 开发时需先启动各子应用的 dev server（npm run dev），端口默认从 5173 开始递增
// 如果端口不对，请根据实际情况修改
// const isDev = import.meta.env.DEV;
// const childAppUrls = isDev
//   ? [
//       { name: "SignIn", url: "http://localhost:5173/" },
//       { name: "Auth-system", url: "http://localhost:5174/" },
//       { name: "RecruitNewPeople", url: "http://localhost:5175/" },
//       { name: "Permission", url: "http://localhost:5176/" },
//     ]
//   : [
//       { name: "SignIn", url: "https://nc-wxwzxbm.gcu.edu.cn/" },
//       { name: "Auth-system", url: "https://nc-wxwcygl.gcu.edu.cn/" },
//       { name: "RecruitNewPeople", url: "https://nc-wxwzx.gcu.edu.cn/" },
//       { name: "Permission", url: "https://nc-wxwqxgl.gcu.edu.cn/" },
//     ];

// // 仅在生产环境执行 preFetch，开发环境跳过避免连接错误
// if (!isDev) {
//   microApp.preFetch(childAppUrls);
// }

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);

app.use(ElementPlus, {
  locale: zhCn,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
pinia.use(piniaPluginPersistedstate);
app.mount("#app");
