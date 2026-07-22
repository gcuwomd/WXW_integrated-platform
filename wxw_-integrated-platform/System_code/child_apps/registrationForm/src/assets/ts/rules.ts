import { reactive } from "vue";
import type { FormRules } from "element-plus";
export const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      validator(rules: any, value: string) {
        console.log(rules);
        const idRegex = /^\d{12}$/;
        if (!value) {
          return new Error("请输入学号");
        } else if (!idRegex.test(value)) {
          return new Error("请输入正确的学号");
        }
        return true;
      },
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      validator(rules: any, value: string) {
        console.log(rules);
        const nameRegex = /^[\u4e00-\u9fa5]+$/;
        if (!value) {
          return new Error("请输入姓名");
        } else if (!nameRegex.test(value)) {
          return new Error("请输入正确的姓名");
        }
        return true;
      },
      trigger: "blur",
    },
  ],
  gender: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur",
    },
  ],
  college: [
    {
      required: true,
      type: "string",
      message: "请选择你的学院",
      trigger: ["blur", "change"],
    },
  ],
  major: [
    {
      required: true,
      validator(rules: any, value: string) {
        console.log(rules);
        const majorRegex = /^[\u4e00-\u9fa5]+$/;
        if (!value) {
          return new Error("请输入专业");
        } else if (!majorRegex.test(value)) {
          return new Error("请输入正确的专业名称");
        }
        return true;
      },
      trigger: "blur",
    },
  ],
  firstIntention: [
    {
      type: "string",
      required: true,
      trigger: ["blur", "change"],
    },
  ],
  secondIntention: [
    {
      type: "string",
      required: true,
      trigger: ["blur", "change"],
    },
  ],
  phone: [
    {
      required: true,
      validator(rules: any, value: string) {
        console.log(rules);
        const phoneRegex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!value) {
          return new Error("请输入手机号码");
        }
        if (!phoneRegex.test(value)) {
          return new Error("请输入正确的手机号码");
        }
        return true;
      },
      trigger: ["blur", "input"],
    },
  ],
  introduction: [
    {
      required: true,
      validator(rules: any, value: string) {
        console.log(rules);
        if (!value) {
          return new Error("简单地自我介绍一下吧~");
        } else if (value.length < 10) {
          return new Error("自我介绍不能少于十个字符");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
});
