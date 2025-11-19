export interface AlovaResponse<T> {
    //默认
    code: number;
    data: T;
    message: string;
    status: number;
    msg?: string;
  }
  export interface login {
    token: string;
    userid: string;
  }
  
  export interface signList {
    activityId: string;
    activityName: string;
    typeName: string;
    notSigned: number;
    signed: number;
    rate: number;
    startTime?: string;
    endTime?: string;
    createTime?: string;
    status: string;
  }
  
  export interface signDetail {
    name: string;
    id: any;
    status: string; // 已签 未签
    department: string;
    time: string;
  }
  
  export interface menuprop {
    path: string /* 路由的访问路径 */;
    name: string;
    component: string;
    icon: string | null;
    meta: { title: string };
    children?: menuprop[];
  }
  
  export interface role {
    id: string;
    username: string;
    department: null;
    phone: null;
    status: number;
    grade?: null;
    roleId?: null;
    email?: null;
  }
  
  export interface signed {
    userName: string;
    id: string;
    status: number; // 已签 未签
    departmentName: string;
    signinTime: string;
  }
  
  export interface meeting {
    time: string;
    endTime: string;
    peopleNumber: string;
    activityName?: string;
    departmentName: string[];
    typeName: string;
    signData: signed[];
  }
  
  export interface roleInfos {
    id: string;
    username: string;
    phone: string;
    department: string;
    status: string;
  }
  export interface departmentList {
    id: string;
    name: string;
    status: number;
  }
  
  export interface depmemberlist {
    id: number;
    username: string;
    departmentId: number;
    grade: number;
    roleId: number;
    avatar: string;
    email: string;
    phone: string;
    createTime: string;
    status: number;
  }
  
  export interface passArray {
    college: string;
    image: { [key: string]: string };
    volunteer: { [key: string]: string };
    gender: string;
    major: string;
    id: string;
    introduction: string;
    username: string;
  }
  
  //权限信息
  export interface permission {
    id: number;
    name: string;
    perms: string;
    status: number;
  }
  //角色列表
  export interface roleList {
    id: number;
    name: string;
    status: number;
  }
  