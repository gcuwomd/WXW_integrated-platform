import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import vueHook from "alova/vue";
import { createServerTokenAuthentication } from "@alova/scene-vue";
import { useStore } from "../store/user.ts";
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
        //...
      },
    },
  });
export const formalURL = "http://10.1.32.242:6602";
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
  // 响应钩子，相当于 axios 的响应拦截器，因为用的是 fetch api 作为请求适配器，因此我们这里把响应数据转化为json格式返回出去
  responded: onResponseRefreshToken(async (response: any) => {
    const data = await response.json();
    // 然后检查状态码
    if (
      data.code === 401 &&
      data.msg !==
        "登陆成功，生成临时token，但是用户信息不完整，请跳转至补充信息页面"
    ) {
      ElMessage({
        message: "登录认证已过期，请返回集成平台重新进入该系统",
        type: "warning",
        plain: true,
      });
      //清除 本地存储
      const store = useStore();
      store.$reset();
      throw new Error("未授权"); // 使用 throw 而不是 return Promise.reject
    }
    // 返回解析后的数据
    return data;
  }),
});
