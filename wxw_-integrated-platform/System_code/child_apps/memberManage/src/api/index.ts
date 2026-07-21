console.log("[memberManage] api/index.ts 模块加载, 初始化 alova...");
import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import vueHook from "alova/vue";
import { createServerTokenAuthentication } from "@alova/scene-vue";
import { useAppStore } from "../store/index";
import { ElMessage } from "element-plus";

const { onAuthRequired, onResponseRefreshToken } =
  createServerTokenAuthentication({});

// 网关路由：/permission/** 会被网关路由到 permission 服务
// 使用相对路径，通过微前端框架代理请求（同源请求）
export const testURL = "/api/permission";
export const alovaInstance = createAlova({
  baseURL: testURL,
  // 响应数据钩子，vue项目就用 alova 提供的 vueHook （必须）
  statesHook: vueHook,
  localCache: null,
  // 请求适配器，alova 官方推荐使用原生 fetch API 作为请求适配器 （必须）
  requestAdapter: GlobalFetch(),
  // 请求前钩子：使用主应用传递的 Token
  // 网关会通过 Token 自动识别用户身份，并通过 X-USER-ID 头传递给 permission 服务
  beforeRequest: onAuthRequired((method) => {
    console.log("[memberManage] alova beforeRequest 触发, url=", method.url);
    const store = useAppStore();
    console.log("[memberManage] store.access_token=", store.access_token);
    const token = store.access_token;
    const Token = token;
    method.config.headers = {
      "Content-Type": "application/json",
    };
    if (!method.meta?.ignoreToken) {
      method.config.headers.Authorization = `Bearer ${Token}`;
      console.log("[memberManage] 请求头已设置 Authorization: Bearer", Token?.substring(0, 20) + "...");
    }
    console.log("[memberManage] 请求即将发送: GET", method.url);
  }),
  // 响应钩子：适配网关 Token 刷新机制
  // 网关返回 205 表示 Token 已刷新，需更新本地 Token
  // 网关返回 401 表示 Token 已失效
  responded: onResponseRefreshToken(async (response: any, _method: any) => {
    const data = await response.json();
    // 处理 Token 刷新（后端网关返回 205）
    if (data.code === 205 && data.data) {
      const store = useAppStore();
      store.access_token = data.data; // 更新本地 Token
    }
    // Token 失效处理
    if (data.code === 401) {
      ElMessage({
        message: data.msg || data.message || "登录认证已过期，请返回集成平台重新进入该系统",
        type: "warning",
        plain: true,
      });
      const store = useAppStore();
      // setup store 不支持 $reset()，手动清除 Token
      store.access_token = "";
      localStorage.removeItem("integration-user");
      throw new Error("未授权");
    }
    return data;
  }),
});
