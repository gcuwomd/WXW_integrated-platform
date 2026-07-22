<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { updateRole, addRole } from "../../api/methods/role/role";
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
  } else {
    form.id = undefined;
    form.username = "";
    form.password = "";
    form.phone = "";
    form.departmentId = undefined;
    form.status = undefined;
    form.email = "";
    form.roleId = undefined;
    form.grade = undefined;
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
  id: undefined as number | undefined,
  username: "" as string | undefined,
  password: "" as string | undefined,
  phone: "" as string | undefined,
  departmentId: undefined as number | undefined,
  status: undefined as number | undefined,
  email: "" as string | undefined,
  roleId: undefined as number | undefined,
  grade: undefined as number | undefined,
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

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value || value.length < 6) {
    callback(new Error("密码长度不能少于6位"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof form>>({
  username: [{ required: true, validator: validateName, trigger: "blur" }],
  id: [{ required: true, validator: validateAcc, trigger: "blur" }],
  password: [{ required: true, validator: validatePassword, trigger: "blur" }],
});

//提交表单
const submitForm = async () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        if (props.mode === "edit") {
          const roleLabel = roleOptions.find(
            (item) => item.value === form.roleId
          )?.label;
          updateRole({ ...form, role: roleLabel }).then((res) => {
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
        } else if (props.mode === "add") {
          addRole({
            id: form.id!,
            username: form.username!,
            password: form.password!,
            departmentId: form.departmentId!,
            grade: form.grade!,
            roleId: form.roleId!,
            email: form.email || "",
            phone: form.phone || "",
            status: form.status!,
          }).then((res) => {
            if (res.code == 200) {
              ElMessage({
                message: "添加成功",
                type: "success",
              });
              emit("complete");
            } else {
              ElMessage({
                message: res.message || "添加失败",
                type: "error",
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
        ElMessage({
          message: "操作失败",
          type: "error",
        });
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
      <el-form-item v-if="props.mode === 'add'" label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-select
          v-model="form.departmentId"
          teleported
          :popper-options="{ strategy: 'fixed' }"
        >
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
      <el-form-item label="年级" prop="grade">
        <el-input v-model.number="form.grade" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select
          v-model="form.roleId"
          teleported
          :popper-options="{ strategy: 'fixed' }"
        >
          <el-option
            v-for="role in roleOptions"
            :key="role.value"
            :label="role.label"
            :value="role.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="form.status"
          teleported
          :popper-options="{ strategy: 'fixed' }"
        >
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
