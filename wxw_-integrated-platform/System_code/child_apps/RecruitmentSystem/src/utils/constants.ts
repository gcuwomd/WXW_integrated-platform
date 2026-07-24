/** 部门ID到名称的映射枚举 */
export const DEPT_NAME_MAP: Record<string, string> = {
  '1': '信息化运维部',
  '2': '网站运维部',
  '3': '网络运维部',
  '4': '行政秘书部',
};

/** 根据部门ID获取部门名称，未匹配时返回原ID */
export const getDeptName = (deptId: string | number): string => {
  const id = String(deptId);
  return DEPT_NAME_MAP[id] || id;
};
