import { alovaInstance } from "../index";
import { AlovaResponse } from "../../type/response-data";
interface formData {
  id: string;
  comment: string;
}
export const assess = (form: formData) => {
  return alovaInstance.Post<AlovaResponse<any>>("/remember/comment", form, {
    shareRequest: false,
  });
};
