import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import vueHook from "alova/vue";
import { createClientTokenAuthentication } from "alova/client";
import { useAppStore } from "../store/index";

const { onAuthRequired, onResponseRefreshToken } =
  createClientTokenAuthentication({});

export const testURL = "https://nc-wxwjcwg.gcu.edu.cn/permission";
export const alovaInstance = createAlova({
  baseURL: testURL,
  // 响应数据钩子，vue项目就用 alova 提供的 vueHook （必须）
  statesHook: vueHook,
  //设置缓存，建议设置单个请求的缓存
  cacheFor: null,
  // 请求适配器，alova 官方推荐使用原生 fetch API 作为请求适配器 （必须）
  requestAdapter: adapterFetch(),
  // 请求前钩子，可以在这里配置一些通用请求头例如 token，content type等等，相当于 axios 的请求拦截器
  beforeRequest: onAuthRequired((method) => {
    const store = useAppStore();
    const token = store.access_token;
    const Token = token;
    method.config.headers = {
      "Content-Type": "application/json",
    };
    if (!method.meta?.ignoreToken) {
      method.config.headers.Authorization = `Bearer ${Token}`;
    }
  }),
  // 响应钩子，相当于 axios 的响应拦截器，因为用的是 fetch api 作为请求适配器，因此我们这里把响应数据转化为json格式返回出去
  responded: onResponseRefreshToken((response, _method) => {
    //...原响应成功拦截器
    return response.json();
  }),
});
