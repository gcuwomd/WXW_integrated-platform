import { createApp } from "vue";
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

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});

pinia.use(piniaPluginPersistedstate);
app.mount("#app");
