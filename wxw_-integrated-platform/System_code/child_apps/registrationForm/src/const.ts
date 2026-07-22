import axios from "axios";
import { ElMessage } from "element-plus";

// 使用相对路径，通过微前端框架代理请求（同源请求）
export const baseUrl = "/api/recruitment";
// export const baseUrl = "http://47uqxj.natappfree.cc";
const axiosConfig = {
  baseURL: baseUrl,
  // HTTP请求超时时间
  timeout: 10000,
  // 设置请求头
  headers: {
    "Content-Type": "application/json",
  },
};
export const baseAxios = axios.create(axiosConfig);

// 从 localStorage 获取主应用传递的 Token
// 主应用将 Token 持久化在 localStorage "integration-user" 中
// 子应用通过 iframe 的 allow-same-origin 共享 localStorage
export const getToken = (): string => {
  const integrationUser = localStorage.getItem("integration-user");
  if (integrationUser) {
    try {
      return JSON.parse(integrationUser).token || "";
    } catch {
      return "";
    }
  }
  return "";
};

// 请求拦截器：添加 Authorization Token
// 网关会通过 Token 自动识别用户身份，并通过 X-USER-ID 头传递给 recruitment 服务
baseAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：适配网关 Token 刷新机制
// 网关返回 205 表示 Token 已刷新，需更新本地 Token
// 网关返回 401 表示 Token 已失效
baseAxios.interceptors.response.use(
  (response) => {
    const data = response.data;
    // 处理 Token 刷新（后端网关返回 205）
    if (data.code === 205 && data.data) {
      // 更新 localStorage 中的 Token，保持与主应用同步
      const integrationUser = JSON.parse(localStorage.getItem("integration-user") || "{}");
      integrationUser.token = data.data;
      localStorage.setItem("integration-user", JSON.stringify(integrationUser));
    }
    // Token 失效处理
    if (data.code === 401) {
      ElMessage({
        message: data.msg || data.message || "登录认证已过期，请返回集成平台重新进入该系统",
        type: "warning",
        plain: true,
      });
      // 清除本地 Token
      localStorage.removeItem("integration-user");
      throw new Error("未授权");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
