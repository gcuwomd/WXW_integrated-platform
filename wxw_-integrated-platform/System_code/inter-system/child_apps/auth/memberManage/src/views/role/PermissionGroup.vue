<!-- 权限组 -->
<template>
    <el-card>
    <div class="flex align-center justify-start">
      <el-button
        type="primary"
        plain
        @click="addGroup('add')"
        >添加权限组</el-button
      >
    </div>
    <div>
      <el-table style="width: 100%" :data="PermissionGroups">
        <el-table-column fixed prop="id" label="id" width="300" />
        <el-table-column prop="name" label="权限组名称" />
        <el-table-column prop="description" label="权限组描述">
          <template #default="scope">
            <el-tooltip
              :content="scope.row.description"
              raw-content
              placement="top-start"
              v-if="scope.row.description"
            >
              <span
                v-if="
                  scope.row.description && scope.row.description.length <= 10
                "
              >
                {{ scope.row.description }}
              </span>
              <span
                v-if="
                  scope.row.description && scope.row.description.length > 10
                "
              >
                {{ scope.row.description.substr(0, 10) + "..." }}
              </span>
            </el-tooltip>
            <span v-else-if="scope.row.description === null||' '"> 暂无描述 </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="权限组状态">
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
                openDrawer(scope.row.name,scope.row.id)
              "
              >配置权限</el-button
            >
            <el-button
              link
              type="danger"
              @click="
                opendelDialog(scope.row.id, '确定删除该权限组？', delPermissionGroup)
              "
              >删除权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <AddGroup 
  :open="isDialogOpen" 
  :mode="modeType"
  :formData="group"
  @complete="handleComplete"
  @close="handleDialogClose"
  />
  <PermissionDrawer 
  :open="isDrawerOpen"
  :title="supTitle"
  :groupId="groupId"
  @close="handleDialogClose"
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
  getPermissionGroups,
  delPermissionGroup
} from "../../api/methods/role/permissionGroup";
import { useRequest } from "alova/client";
import { permissionGroup } from "../../type/response-data";
//关于权限组的网络请求
const PermissionGroups = ref<permissionGroup[]>([]);
const { onSuccess: getPerGroupsSuccess, send: getPerGroupsUpdate } = useRequest(
  () => getPermissionGroups(),
  {
    immediate: false,
  }
)
getPerGroupsSuccess((response) => {
  if (response.data.code == 200) {
    PermissionGroups.value = response.data.data;
  }
});
onMounted(async () => {
  await getPerGroupsUpdate()
});

//配置权限
const supTitle=ref<string>('')
const isDrawerOpen=ref<boolean>(false)
const groupId = ref<string>('')
//添加权限组
const group=ref<permissionGroup>()
const isDialogOpen=ref<boolean>(false)
const modeType=ref<string>('')
const addGroup=(mode: string)=>{
  isDialogOpen.value=true
  modeType.value=mode
}

//删除权限组
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

// 对话框打开与关闭的点击事件
const handleComplete = () => {
  getPerGroupsUpdate();
  isDialogOpen.value = false;
  isDelopen.value = false
};
const handleDialogClose = () => {
  isDialogOpen.value = false;
  isDrawerOpen.value=false
};

const openDrawer=(supTit:string,id:number)=>{
  supTitle.value=supTit
  groupId.value = String(id);
  isDrawerOpen.value=true
}
</script>

<style scoped>

</style>
