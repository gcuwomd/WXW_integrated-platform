import { baseAxios } from "../../const";
export const acquire = () => {
  return baseAxios.get("/user/ip");
};
