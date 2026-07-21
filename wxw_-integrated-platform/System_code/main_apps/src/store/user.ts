import { defineStore } from "pinia";
import { ref } from "vue";
//用户属性
export const useStore = defineStore(
  "user",
  () => {
    const userid = ref<string | null>();
    const token = ref<string | null>(); //用户主系统token
    const roleId = ref<number | null>(); //角色id
    const departmentId = ref<number | null>(); //部门id
    const code = ref<string | null>(); // 主系统的code
    const avatar = ref<string | null>(); // 用户头像
    return { userid, token, code, roleId, departmentId, avatar };
  },
  {
    persist: {
      key: "integration-user",
      storage: localStorage,
    },
  }
);
