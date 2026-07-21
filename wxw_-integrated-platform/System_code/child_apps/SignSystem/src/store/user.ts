import { defineStore } from "pinia";
import { ref } from "vue";
//用户属性
export const useStore = defineStore(
  "user",
  () => {
    // const departmentId = ref<number | null>(); //所属部门id
    const userid = ref<number | null>();
    const childtoken = ref<string | null>(); //用户主系统token
    const code = ref<string | null>();
    const departmentId = ref<number | null>(); //所属部门id
    return { userid, childtoken, code, departmentId };
  },
  {
    persist: {
      key: "sign-user",
      storage: localStorage,
    },
  }
);
