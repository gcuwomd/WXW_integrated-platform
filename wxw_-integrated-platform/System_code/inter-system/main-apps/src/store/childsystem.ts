import { defineStore } from "pinia";
import { ref } from "vue";
//用户属性
export const useStore = defineStore(
  "childsystem",
  () => {
    // const departmentId = ref<number | null>(); //所属部门id
    const childSystemCode = ref<number | null>();
    return { childSystemCode };
  },
  {
    persist: {
      key: "childsystem-information",
      storage: localStorage,
    },
  }
);
