<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { updateRole } from "../../api/methods/role/role";
import { InfoUser } from "../../type/response-data";

interface DialogProps {
  open: boolean;
  title: string;
  mode: "add" | "edit";
  formData?: InfoUser | null;
}
const props = defineProps<DialogProps>();
const emit = defineEmits<{
  close: [];
  complete: [];
}>();

// 控制 dialog 打开和关闭
const open = ref<boolean>(false);
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen;
  }
);
const handleOpen = () => {
  if (props.mode === "edit") {
    Object.assign(form, props.formData);
  }
};
// 关闭 dialog 时，初始化表单
const closeDialog = () => {
  nextTick(() => {
    formRef.value?.resetFields();
  });
  emit("close");
};

const formRef = ref<FormInstance>();
const form = reactive({
  id: props.formData?.id,
  username: props.formData?.username,
  phone: props.formData?.phone,
  departmentId: props.formData?.departmentId,
  status: props.formData?.status,
  email: props.formData?.email,
  role: props.formData?.role,
  roleId: props.formData?.roleId,
  grade: props.formData?.grade,
});

const departmentOptions = [
  { value: 1, label: "信息化运维部" },
  { value: 2, label: "网站运维部" },
  { value: 3, label: "网络运维部" },
  { value: 4, label: "行政秘书部" },
];

const statusOptions = [
  { value: 1, label: "在职" },
  { value: 2, label: "退休" },
];
const roleOptions = [
  { value: 1, label: "部门员工" },
  { value: 2, label: "部门管理员" },
];

//校验表单
const validateAcc = (_rule: any, value: any, callback: any) => {
  let regex = /^[0-9]{12}$/;
  if (!regex.test(value)) {
    callback(new Error("学号格式不正确(12位)"));
  } else {
    callback();
  }
};

const validateName = (_rule: any, value: any, callback: any) => {
  let regex = /^[\u4e00-\u9fa5]{2,6}$/;
  if (!regex.test(value)) {
    callback(new Error("姓名格式不正确(两位汉字或以上)"));
  } else {
    callback();
  }
};

// const validatePhone = (_rule: any, value: any, callback: any) => {
//   let regex = /^[0-9]{10,11}$/;
//   if (!regex.test(value)) {
//     callback(new Error("电话格式不正确(11位)"));
//   } else {
//     callback();
//   }
// };

const rules = reactive<FormRules<typeof form>>({
  username: [{ required: true, validator: validateName, trigger: "blur" }],
  id: [{ required: true, validator: validateAcc, trigger: "blur" }],
  // phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
});

//提交表单
const submitForm = async () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        if (props.mode === "edit") {
          form.role = roleOptions.find(
            (item) => item.value === form.roleId
          )?.label;
          updateRole(form).then((res) => {
            if (res.code == 200) {
              ElMessage({
                message: "修改成功",
                type: "success",
              });
              emit("complete"); // 触发完成事件
            } else {
              ElMessage({
                message: "修改失败",
                type: "error",
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
};
</script>
<template>
  <el-dialog
    v-model="open"
    :title="props.title"
    :show-close="false"
    width="512"
    class="!rounded-lg"
    @open="handleOpen"
    @close="closeDialog"
  >
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="学号" prop="id">
        <el-input v-model.number="form.id" />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-select v-model="form.departmentId">
          <el-option
            v-for="department in departmentOptions"
            :key="department.value"
            :label="department.label"
            :value="department.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId">
          <el-option
            v-for="role in roleOptions"
            :key="role.value"
            :label="role.label"
            :value="role.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status">
          <el-option
            v-for="status in statusOptions"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{
          props.mode === "add" ? "添加" : "修改"
        }}</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped></style>
