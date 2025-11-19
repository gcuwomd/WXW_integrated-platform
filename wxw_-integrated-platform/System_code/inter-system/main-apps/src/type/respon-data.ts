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

export interface system {
  id: number;
  clientId: number;
  clientName: string;
  clientSecret: string;
  redirectUris: string;
  requireAuthorizationConsent: string;
  scope: string;
  status: number;
  url: string;
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
