import { defineStore } from "pinia";
import { ref } from "vue";
//用户属性
export const useStore = defineStore(
  "user",
  () => {
    // const departmentId = ref<number | null>(); //所属部门id
    const userid = ref<number | null>();
    const token = ref<string | null>(); //用户主系统token
    const code = ref<string | null>();
    const departmentId = ref<number | null>(); //所属部门id
    const roleId = ref<number | null>(); //角色id
    const cleanall = () => {
      userid.value = null;
      token.value = null;
      code.value = null;
      departmentId.value = null;
      roleId.value = null;
    };
    return { userid, token, code, departmentId, roleId, cleanall };
  },
  {
    persist: {
      key: "Recruitment-user",
      storage: localStorage,
    },
  }
);
