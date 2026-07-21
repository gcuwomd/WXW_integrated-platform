export interface submitScore {
  userId: number;
  totalScore: number | null;
  others: string | null;
  activityId: number;
}

export interface InfoUserToPut {
  id: number | undefined;
  username: string | undefined;
  phone: string | undefined;
  departmentId: number | undefined;
  status: number | undefined;
  email: string | undefined;
  role: string | null | undefined;
  grade: number | undefined;
}

export interface activityInter {
  activityId: number;
  activityName: string;
  description: string;
  year?: any;
}
