<template>
  <el-card>
    <template #header>
      <div class="card-header" style="display: flex; align-items: center">
        <span style="flex-grow: 1">子系统管理</span>
        <el-button
          type="success"
          plain
          @click="openDialog('添加子系统', addSystems, false)"
          >添加子系统</el-button
        >
      </div>
    </template>
    <el-table :data="tableData" style="display: flex; width: 100%">
      <el-table-column prop="clientId" label="系统id" style="width: 20%" />
      <el-table-column prop="clientName" label="系统名称" width="200" />
      <el-table-column prop="status" label="状态" width="150"
        ><template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? "可用" : "禁用" }}
          </el-tag>
        </template></el-table-column
      >
      <el-table-column
        prop="url"
        label="链接"
        width="400"
        class="ellipsis-multiline"
      >
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="scope.row.url"
            placement="right"
          >
            {{ scope.row.url }}
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="240px" style>
        <template #default="scope">
          <el-button
            type="primary"
            @click="openDialog('修改子系统', editSystems, true, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="
              opendelDialog(scope.row.id, '确定删除该子系统？', delSystems)
            "
            >删除</el-button
          >
          <el-button
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            @click="editstatus(scope.row.status, scope.row.id)"
            >{{ scope.row.status === 1 ? "停用" : "启用" }}</el-button
          >
        </template>
      </el-table-column></el-table
    >
  </el-card>
  <AddOrEditDialog
    :visible="isAddOrEditopen"
    :id="id"
    :title="dialogTitle"
    :apiMethod="currentApiMethod"
    :fields="currentFields"
    :initialData="initialData"
    :row="row"
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
import { system } from "../type/response-data";
import { debouncedShowMessage } from "../utils/debounce";

const tableData = ref<system[]>([]);
import {
  stopSystems,
  startSystems,
  editSystems,
  delSystems,
  addSystems,
  getSystems,
} from "../api/methods/role/systemMagnage";

onMounted(() => {
  //获取子系统列表
  getSystemList();
});
// 添加或删除时 使用 id
const id = ref<string>("");

// 接口 获取 子系统列表
const getSystemList = async () => {
  let data = (await getSystems()).data;
  tableData.value = data;
};
// 两个对话框 关闭时 都进行操作
const handleComplete = () => {
  getSystemList();
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
const initialData = ref<Record<string, any>>({}); // 初始化 表单参数
const row = ref<any>();
const isEditing = ref(false); // false 表示添加模式，true 表示编辑模式
const addFields = computed(() => [
  { model: "clientId", placeholder: "请输入系统ID", label: "系统ID" },
  { model: "clientName", placeholder: "请输入名称", label: "系统名称" },
  { model: "url", placeholder: "请输入系统链接", label: "链接" },
  { model: "clientSecret", placeholder: "请输入密钥", label: "系统密钥" },
  { model: "status", placeholder: "请选择状态", label: "状态" },

  // { model: "redirectUris", placeholder: "请输入地址", label: "重定向地址" },
  // {
  //   model: "requireAuthorizationConsent",
  //   placeholder: "请输入是否需要授权同意",
  //   label: "授权同意",
  // },
]);
const editFields = computed(() => [
  { model: "clientId", placeholder: "请输入系统ID", label: "系统ID" },
  { model: "clientName", placeholder: "请输入名称", label: "系统名称" },
  { model: "url", placeholder: "请输入系统链接", label: "链接" },
  { model: "status", placeholder: "请选择状态", label: "状态" },
  // { model: "clientSecret", placeholder: "请输入密钥", label: "系统密钥" },
  // { model: "redirectUris", placeholder: "请输入地址", label: "重定向地址" },
  // {
  //   model: "requireAuthorizationConsent",
  //   placeholder: "请输入是否需要授权同意",
  //   label: "授权同意",
  // },
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

const editstatus = async (status: number, id: number) => {
  if (status == 1) {
    let data = await stopSystems(id);
    if (data.code == 200) {
      getSystemList();
      debouncedShowMessage("修改成功", "success");
    }
  } else {
    let data = await startSystems(id);
    if (data.code == 200) {
      getSystemList();
      debouncedShowMessage("修改成功", "success");
    }
  }
};
</script>

<style scoped>
.ellipsis-multiline {
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 省略号 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制显示 2 行 */
  -webkit-box-orient: vertical; /* 垂直排列 */
}
</style>
