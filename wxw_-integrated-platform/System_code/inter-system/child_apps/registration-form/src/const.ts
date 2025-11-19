import axios from "axios";
export const baseUrl = "http://10.1.32.242:6604";
// export const baseUrl = "http://47uqxj.natappfree.cc";
const axiosConfig = {
  baseURL: baseUrl,
  // HTTP请求超时时间为3秒
  timeout: 3000,
  // 设置请求头
  headers: {
    "Content-Type": "application/json",
  },
};
export const baseAxios = axios.create(axiosConfig);
