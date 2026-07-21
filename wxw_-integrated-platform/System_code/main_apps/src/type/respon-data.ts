export interface AlovaResponse<T> {
  //默认
  code: number;
  data: T;
  message: string;
  status: number;
  msg?: string;
}

// 用户列表
export interface userList {
  id: string | null;
  username: string | null;
  departmentId: number | null;
  department: string | null;
  grade: number | null;
  roleId: number | null;
  role: string | null;
  avatar: string;
  email: string | null;
  phone: string | null;
  createTime: string | null;
  status: number | null;
}

export interface departmentList {
  id: number | null;
  name: string;
  status: number | null;
}

export interface roleList {
  id: number | null;
  name: string;
  status: number | null;
}

// 已注册用户 更新信息用的
export interface updateUserList {
  id: string | null;
  username: string | null;
  grade: number | null;
  email: string | null;
  phone: string | null;
}

// 旧 OAuth2 子系统类型（已废弃，后端 oauth2 接口已停用）
export interface system {
  id: number;
  clientId: string;  // 后端实际返回字符串类型
  clientName: string;
  clientSecret: string;
  redirectUris: string;
  requireAuthorizationConsent: string;
  scope: string;
  status: number;
  url: string;
}

// 新路由类型（匹配后端 Routes 实体，替代旧的 system 类型）
export interface RouteItem {
  id: number;
  name: string;       // 路由名称（子系统名称）
  path: string;        // 路由路径（子系统 URL）
  component: string;   // 路由组件
  parent: number | null; // 父路由 id
  icon: string;        // 图标
  perm: number | null; // 权限
  status: number;      // 状态
  clientId: number;    // 所属子系统
}

// 路由菜单类型（匹配后端 RoutesMenu 实体）
export interface RoutesMenu {
  name: string;
  component: string;
  path: string;
  icon: string;
  meta: {
    title: string;
    [key: string]: any;
  };
  children: RoutesMenu[];
}

// 注册时 补充信息用的
export interface supple {
  departmentId: number | null;
  username: string;
  grade?: number;
  roleId?: number;
  email?: number;
  phone?: number;
}
