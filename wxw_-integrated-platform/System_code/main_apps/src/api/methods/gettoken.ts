import { alovaInstance } from "..";
import { AlovaResponse } from "../../type/respon-data";

// 获取主系统 token
// 网关 OAuth2 登录接口：前端从 auth.gcu.edu.cn 回调后携带 code 参数
// 网关 CustomAuthenticationSuccessHandler 处理 OAuth2 认证并返回 JWT
// - code=200: 正常用户登录成功，data 为 JWT Token
// - code=401: 临时用户（信息不完整），data 为临时 Token，需跳转补充信息页
// /login 接口不需要 Token 鉴权，通过 ignoreToken 跳过 Authorization 头
export const gettoken = (code: string) => {
  return alovaInstance.Post<AlovaResponse<string>>(
    "/login",
    { code: code },
    { meta: { ignoreToken: true } }
  );
};
