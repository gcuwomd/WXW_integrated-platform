<!-- 权限 -->
<template>
  <el-card>
    <div class="flex align-center justify-start">
      <el-button
        type="primary"
        plain
        style="justify-self: end"
        @click="openDialog('添加权限', AddPermission, false)"
        >添加权限</el-button
      >
    </div>
    <div>
      <el-table style="width: 100%" :data="PermissionList">
        <el-table-column fixed prop="id" label="权限id" width="300" />
        <el-table-column prop="name" label="权限名称" />
        <el-table-column prop="perms" label="权限标识" />
        <el-table-column prop="status" label="权限状态">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 1 ? 'success' : 'danger'"
              disable-transitions
            >
              {{ scope.row.status === 1 ? "在用" : "弃用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="
                openDialog('修改权限', EditPermission, true, scope.row.id)
              "
              >修改</el-button
            >
            <el-button
              link
              type="danger"
              @click="
                opendelDialog(scope.row.id, '确定删除该权限？', delPermission)
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <AddOrEditDialog
    :visible="isAddOrEditopen"
    :id="permissionId"
    :title="dialogTitle"
    :apiMethod="currentApiMethod"
    :fields="currentFields"
    :initialData="initialData"
    :editId="editId"
    @close="isAddOrEditopen = false"
    @complete="handleComplete"
  />
  <DeletDialog
    :visible="isDelopen"
    :id="delId"
    :title="DeldialogTitle"
    :apiMethod="DelcurrentApiMethod"
    @close="isDelopen = false"
    @complete="handleComplete"
  />
</template>

<script setup lang="ts">
import {
  getPermissionList,
  AddPermission,
  EditPermission,
  delPermission,
} from "../../api/methods/role/permission";
import { permission } from "../../type/response-data";
import AddOrEditDialog from "../../components/dialog/AddOrEditDialog.vue";
import DeletDialog from "../../components/dialog/DeletDialog.vue";
import { useRequest } from "alova/client";
import { useAppStore } from "../../store";

const store = useAppStore();
const PermissionList = ref<permission[]>();
const permissionId = ref<string>("");

//获取权限列表
const { onSuccess: getPerListsSuccess, send: getPerListsUpdate } = useRequest(
  () => getPermissionList()
);
getPerListsSuccess((response) => {
  if (response.data.code == 200) {
    PermissionList.value = store.roleList = response.data.data;
  }
});
onMounted(async () => {
  await getPerListsUpdate();
});

const handleComplete = () => {
  getPerListsUpdate();
  isAddOrEditopen.value = false;
  isDelopen.value = false;
};
//------------添加修改对话框--------------//
const isAddOrEditopen = ref<boolean>(false);
const dialogTitle = ref<string>("");
const currentApiMethod = ref<Function>(() => {});
const currentFields = computed(() => {
  return isEditing.value ? editFields.value : addFields.value;
});
const initialData = ref<Record<string, any>>({});
const editId = ref<number>();
const isEditing = ref(false); // false 表示添加模式，true 表示编辑模式
const addFields = computed(() => [
  { model: "name", placeholder: "请输入名称", label: "权限名称" },
  { model: "perms", placeholder: "请输入标识", label: "权限标识" },
]);
const editFields = computed(() => [
  { model: "name", placeholder: "请输入名称", label: "权限名称" },
  { model: "perms", placeholder: "请输入标识", label: "权限标识" },
  { model: "status", placeholder: "请输入状态", label: "状态" },
]);

const openDialog = (
  title: string,
  api: Function,
  isEdit: boolean,
  row?: any
) => {
  isAddOrEditopen.value = true;
  dialogTitle.value = title;
  currentApiMethod.value = api;
  initialData.value = row; // 数据传输
  if (isEdit) {
    isEditing.value = true;
  } else {
    isEditing.value = false;
  }
};
//------------删除对话框--------------//
const isDelopen = ref<boolean>(false);
const DeldialogTitle = ref<string>("");
const delId = ref<number>();
const DelcurrentApiMethod = ref<Function>(() => {});
const opendelDialog = (id: number, title: string, api: Function) => {
  DeldialogTitle.value = title;
  DelcurrentApiMethod.value = api;
  delId.value = id;
  isDelopen.value = true;
};
</script>

<style scoped></style>
