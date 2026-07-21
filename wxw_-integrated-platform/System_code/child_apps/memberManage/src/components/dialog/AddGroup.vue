<script setup lang="ts">
import type { FormInstance, FormRules,CheckboxValueType } from "element-plus";
import { AddPermissionGroup } from '../../api/methods/role/permissionGroup'
import { type permission } from "../../type/response-data";
import { useAppStore } from '../../store';
  
const store = useAppStore()
interface DialogProps {
  open: boolean;
  mode: "add" | string;
  formData?: {
    name: string;
    description: string;
    roles:any
  };
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

//配置权限
const checkAll = ref(false)
const isIndeterminate = ref(true)
const permissionList = ref<permission[]>([])

onMounted(()=>{
  permissionList.value=store.roleList 
})

const handleCheckAllChange: any = (val: CheckboxValueType) => {
  form.roles = val ? permissionList.value : []
  isIndeterminate.value = false
}
const handleCheckedPermissionChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === permissionList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < permissionList.value.length
}

const formRef = ref<FormInstance>();
const form = reactive({
  name: props.formData?.name,
  description: props.formData?.description,
  roles: props.formData?.roles,
  status:1
});

const rules = reactive<FormRules<typeof form>>({
  name: [{ required: true, message: "请输入权限组名称", trigger: "blur" },
  { min: 0, max: 8, message: "名称不超过8位", trigger: "blur" }],
  description: [{ required: true, message: "请输入权限组描述", trigger: "blur" }],
});

const submitForm = async () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        console.log(form);
        
        const res = await AddPermissionGroup(form);
        if (res.code === 200) {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          emit("complete"); // 触发完成事件          
        } else {
          ElMessage({
            message: '添加失败',
            type: 'error',
          })
        }
      } catch (error) {
        console.log("提交错误：", error);
      }
    }
  });
};



// 关闭 dialog 时，初始化表单
const closeDialog = () => {
  formRef.value?.resetFields();
  form.roles=[]
  isIndeterminate.value=false
  checkAll.value=false
  emit("close");
};
</script>
<template>
  <el-dialog v-model="open" :show-close="false" width="512" class="!rounded-lg" @close="closeDialog">
    <el-form ref="formRef" style="max-width: 600px" :model="form" :rules="rules" label-position="top">
      <el-form-item label="权限组名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="权限组描述" prop="description">
        <el-input v-model="form.description" type="textarea" maxlength="30" show-word-limit />
      </el-form-item>
      <el-form-item label="权限组状态" prop="status">
        <el-tag type="success">
          启用
        </el-tag>
      </el-form-item>
      <el-form-item label="选择权限">
        <div class="flex flex-col mb-5">
        <el-checkbox 
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange">
        全选
      </el-checkbox>
      <el-checkbox-group 
        v-model="form.roles" 
        class="flex justify-evenly"
        @change="handleCheckedPermissionChange">
        <el-checkbox 
          v-for="permission in permissionList" 
          :key="permission.id" 
          :label="permission" 
          :value="permission">
          {{ permission.name }}
        </el-checkbox>
      </el-checkbox-group>
      </div> 
      </el-form-item>
    </el-form>
    <template #footer style="border-top: 1px black solid">
      <el-button type="primary" @click="submitForm">{{
        props.mode === "add" ? "添加" : "无操作"
      }}</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
