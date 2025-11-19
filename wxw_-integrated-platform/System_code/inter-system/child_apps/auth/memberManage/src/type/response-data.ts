export interface InfoUser {
  id: number;
  email: string;
  phone: string;
  role: string | null;
  status: number;
  grade: number;
  departmentId: number;
  username: string;
  department: string;
  activity: string;
  roleId: number;
}

export interface EvaluateInfos {
  indicators: string;
  element: string;
  content: string;
  standardScore: number;
  score: number | null;
}

export interface AlovaResponse<T> {
  //默认
  code: number;
  data: T;
  message: string;
  status: number;
  msg?: string;
}

export interface permission {
  id: number;
  name: string;
  perms: string;
  status: number;
}
export interface permissionGroup {
  id: number;
  name: string;
  status: number;
  description: string;
  roles: permission[];
}

export interface addPermissionGroup {
  name: string | undefined;
  description: string | undefined;
  roles: permission[] | undefined;
}

export interface system {
  id: number;
  clientId: string;
  clientName: string;
  clientSecret: string;
  redirectUris: string;
  requireAuthorizationConsent: string;
  scope: string;
  status: number;
  url: string;
}
// 路由Interface
export interface menuprop {
  path: string;
  name: string;
  component: string;
  meta?: any;
  icon: null;
  children?: Array<{
    path: string;
    name: string;
    component: string;
    meta?: any;
    icon: null;
    children?: menuprop[]; // 三级路由
  }>;
}

// 细则列表
export interface indicatorslist {
  indicatorsId: number | null;
  indicatorsName: string;
  elements: elements[];
}

// 添加细则
export interface addIndicators {
  indicatorsName: string;
  elements: elements[];
}

//更改细则
export interface editIndicators {
  indicatorsId: number | null;
  indicatorsName: string;
  elements: elements[];
}

//删除评分规则
export interface delIndicators {
  indicatorsId: number;
  elementsId: number[];
}

// 细则条目
export interface elements {
  elementsId?: number | null;
  elementsName: string;
  content: string;
  indicatorsId?: number | null;
  standardScore: number;
}

// 部门列表 []
export interface department {
  id: number;
  name: string;
  status: number;
}

// 部门成员 []
export interface departmentMember {
  id: number;
  username: string;
  roleId: number;
}

// 部门成员列表
export interface departmentMemberList {
  id: number;
  name: string;
  status: number;
  members?: departmentMember[];
}

// 组织学年评分列表
export interface userEvalute {
  userId: number;
  username: string;
  year: number;
  totalScore: number;
  status: string;
  departmentId: number;
  departmentName: string;
}

// 成员某学年活动评分列表
export interface userActEvalute {
  activityId: number;
  activityName: string;
  description: string;
  year: number;
  total: number | null;
}
