//子系统
import { alovaInstance } from "..";
import { AlovaResponse, RoutesMenu, system } from "../../type/respon-data";

// 获取路由列表（替代旧的 /oauth/selectList）
// 网关路由：/permission/routes/get → permission 服务 /routes/get
export const getsystemList = () => {
  return alovaInstance.Get<AlovaResponse<system[]>>("/permission/oauth/selectList");
};

// 获取路由菜单（按 clientId 查询某个子系统的菜单）
// 网关路由：/permission/routes/getMenus?clientId=xxx → permission 服务 /routes/getMenus
export const getMenusByClientId = (clientId: number, parentId?: number) => {
  const params: Record<string, string> = { clientId: String(clientId) };
  if (parentId !== undefined) {
    params.parentId = String(parentId);
  }
  return alovaInstance.Get<AlovaResponse<RoutesMenu[]>>(
    "/permission/routes/getMenus",
    { params }
  );
};

// 获取个人路由菜单（按当前登录用户的权限，查询某个子系统的菜单）
// 网关路由：/permission/routes/getPersonalMenus?clientId=xxx → permission 服务 /routes/getPersonalMenus
// 网关会通过 Token 解析出 X-USER-ID 头传递给下游服务
export const getPersonalMenus = (clientId: number) => {
  return alovaInstance.Get<AlovaResponse<RoutesMenu[]>>(
    "/permission/routes/getPersonalMenus",
    { params: { clientId: String(clientId) } }
  );
};

// 注销登录
// 网关路由：/permission/logout → permission 服务 /logout
export const logout = () => {
  return alovaInstance.Get<AlovaResponse<string>>("/permission/logout");
};
