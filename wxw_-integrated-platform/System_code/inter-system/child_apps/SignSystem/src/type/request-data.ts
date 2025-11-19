export interface formtype {
  //创建签到表单类型
  yesOrNoAdministrator: string;
  sponsorLocation: {
    latitude: string;
    longitude: string;
    distance: string;
  };
  activity: {
    activityName: string;
    typeName: string;
    startTime: string;
    endTime: string;
    userId: number[];
    departmentId: number[];
    description: string;
  };
}

export interface registertype {
  id?: number;
  password: string;

  username: string;
  departmentId?: number;
  email?: string | null;
  phone?: string | null;
  code: string;
}
