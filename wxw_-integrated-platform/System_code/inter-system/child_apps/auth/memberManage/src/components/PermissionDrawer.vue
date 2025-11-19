<script setup lang="ts">
import { getPermissionGroupsById } from "../api/methods/role/permissionGroup";
import { EditPermission } from "../api/methods/role/permission";
import { useRequest } from "alova/client";
import { type permission } from "../type/response-data";
import type { CheckboxValueType } from "element-plus";
interface Props {
  open: boolean;
  title: string;
  groupId: string;
}
const props = defineProps<Props>();

const supTitle = ref<string>("");
const groupId = ref<string>("");
// 控制 打开和关闭
const open = ref<boolean>(false);
watch(
  () => [props.open, props.title, props.groupId],
  ([isOpen, supTit, id]) => {
    open.value = isOpen as boolean;
    supTitle.value = supTit as string;
    groupId.value = id as string;
  }
);
const emit = defineEmits<{
  close: [];
}>();
const closeDialog = () => {
  emit("close");
};

//配置权限
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedPermission = ref<any>();
const permissionList = ref<permission[]>([]);

const handleCheckAllChange: any = (val: CheckboxValueType) => {
  checkedPermission.value = val ? permissionList.value : [];
  isIndeterminate.value = false;
};
const handleCheckedPermissionChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === permissionList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < permissionList.value.length;
};

if (!groupId.value) {
  //出现groupId为null的情况
  const { onSuccess: getPerGroupsSuccess, send: get } = useRequest(
    () => getPermissionGroupsById(groupId.value),
    {
      immediate: false,
    }
  );
  getPerGroupsSuccess((response) => {
    if (response.data.code == 200) {
      permissionList.value = response.data.data;
    }
  });

  watchEffect(async () => {
    await get();
  });
}

//保存修改配置权限
const savePermission = async () => {
  const res = await EditPermission(checkedPermission.value);
  if (res.code === 200) {
    console.log("success:", checkedPermission.value);
  }
};
</script>
<template>
  <el-drawer v-model="open" size="40%" :show-close="false" @close="closeDialog">
    <template #header>
      <h3 class="titleClass">配置权限</h3>
    </template>
    <el-scrollbar>
      <el-card shadow="hover">
        <template #header>
          <div class="text-start">
            <el-text class="mx-1">{{ supTitle }}</el-text>
          </div>
        </template>
        <div class="flex flex-col mb-5">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="checkedPermission"
            class="flex justify-evenly"
            @change="handleCheckedPermissionChange"
          >
            <el-checkbox
              v-for="permission in permissionList"
              :key="permission.id"
              :label="permission"
              :value="permission"
            >
              {{ permission.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-card>
    </el-scrollbar>
    <template #footer>
      <div class="text-start">
        <el-button type="primary" @click="savePermission">保存</el-button>
        <el-button @click="closeDialog()">返回</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<style scoped>
.titleClass {
  flex: none;
  margin: 0;
}
</style>
