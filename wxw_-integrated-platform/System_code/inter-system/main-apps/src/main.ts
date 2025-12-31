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

microApp.preFetch([
  { name: "SignIn", url: "https://nc-wxwzxbm.gcu.edu.cn/" },
  { name: "Auth-system", url: "https://nc-wxwcygl.gcu.edu.cn/" },
  { name: "RecruitNewPeople", url: "https://nc-wxwzx.gcu.edu.cn/" },
]);

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
