import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import vueHook from "alova/vue";
import { createServerTokenAuthentication } from "@alova/scene-vue";
import { useStore } from "../store/user";
import { ElMessage } from "element-plus";

const { onAuthRequired, onResponseRefreshToken } =
  createServerTokenAuthentication({
    refreshTokenOnSuccess: {
      // 响应时触发，可获取到response和method，并返回boolean表示token是否过期
      // 当服务端返回401时，表示token过期
      isExpired: (response) => {
        return response.status === 401;
      },
      // 当token过期时触发，在此函数中触发刷新token
      handler: async () => {
        // 网关会自动处理 Token 刷新，返回 205 状态码时已在 responded 钩子中处理
      },
    },
  });
// 网关路由：/recruitment/** 会被网关路由到 recruitment 服务
// 使用相对路径，通过微前端框架代理请求（同源请求）
export const formalURL = "/api/recruitment";
export const alovaInstance = createAlova({
  baseURL: formalURL,
  // 响应数据钩子，vue项目就用 alova 提供的 vueHook （必须）
  statesHook: vueHook,
  localCache: null,
  // 请求适配器，alova 官方推荐使用原生 fetch API 作为请求适配器 （必须）
  requestAdapter: GlobalFetch(),
  // 请求前钩子，可以在这里配置一些通用请求头例如 token，content type等等，相当于 axios 的请求拦截器
  beforeRequest: onAuthRequired((method) => {
    const store = useStore();
    const Token = store.token;
    method.config.headers = {
      "Content-Type": "application/json",
    };
    if (!method.meta?.ignoreToken) {
      method.config.headers.Authorization = `Bearer ${Token}`;
    }
  }),
  // 响应钩子：适配网关 Token 刷新机制
  // 网关返回 205 表示 Token 已刷新，需更新本地 Token
  // 网关返回 401 表示 Token 已失效
  responded: onResponseRefreshToken(async (response: any) => {
    const data = await response.json();
    // 处理 Token 刷新（后端网关返回 205）
    if (data.code === 205 && data.data) {
      const store = useStore();
      store.token = data.data; // 更新本地 Token
    }
    // 检查状态码
    if (data.code === 401) {
      ElMessage({
        message: data.msg || data.message || "登录认证已过期，请返回集成平台重新进入该系统",
        type: "warning",
        plain: true,
      });
      const store = useStore();
      store.cleanall();
      throw new Error("未授权");
    }
    // 返回解析后的数据
    return data;
  }),
});
