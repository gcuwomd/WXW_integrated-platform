import { defineStore } from "pinia";
import { ref } from "vue";
import { signList } from "../type/response-data";
export const useTransformStore = defineStore("transform", () => {
  const signInfos = ref<signList[]>([]);
  const isRouterAlive = ref<boolean>(true);
  const isLoading = ref<boolean>(false);
  const isNull = ref<boolean>(false);
  return { signInfos, isRouterAlive, isLoading, isNull };
});
