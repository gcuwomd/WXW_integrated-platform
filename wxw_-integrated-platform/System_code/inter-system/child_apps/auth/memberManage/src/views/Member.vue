<script setup lang="ts">
import { Search, Refresh } from "@element-plus/icons-vue";
import { useAppStore } from "../store";
import { InfoUser } from "../type/response-data";
import { getRoles, deleteRole } from "../api/methods/role/role";
import { useRequest } from "alova/client";
const appStore = useAppStore();
const name = ref<string>("");
const isDisabled = ref(false);
const loading = ref<boolean>(false);

const allTableData = ref<InfoUser[]>([]);
const page = reactive<{
  currentPage: number;
  size: number;
  total: number;
}>({
  currentPage: 1,
  size: 10,
  total: 10,
});

//获取角色列表
const { onSuccess: getPerRolesSuccess, send: getPerRolesUpdate } = useRequest(
  () => getRoles(),
  {
    immediate: false,
  }
);
getPerRolesSuccess((response) => {
  if (response.data.code == 200) {
    appStore.userInfos = allTableData.value = response.data.data;
  }
});
onMounted(async () => {
  await getPerRolesUpdate();
});

//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  //total总页数实际值
  page.total = allTableData.value.length;
  return allTableData.value.filter(
    (_item: any, index: number) =>
      index < page.currentPage * page.size &&
      index >= page.size * (page.currentPage - 1)
  );
};
//改变页码
const handleCurrentChange = (e: number) => {
  page.currentPage = e;
};
//改变页数限制
const handleSizeChange = (e: number) => {
  page.size = e;
};

//从pinia里面拿取用户信息,筛选所需信息
const filterData = (newItem: string) => {
  allTableData.value = appStore.userInfos.filter(
    (item: { department: string; username: string }) =>
      item.department == newItem || item.username == newItem
  );
  nextTick(() => {
    tableData();
  });
};
const handleSelectDep = (index: string) => {
  filterData(index);
};
const searchName = (name: string) => {
  filterData(name);
};
//刷新表格,重新获取全部数据
const handleLoading = () => {
  loading.value = !loading.value;
  setTimeout(() => {
    allTableData.value = appStore.userInfos;
    loading.value = !loading.value;
  }, 1500);
};

//------------添加修改对话框--------------//
const isOpen = ref<boolean>(false);
const dialogTitle = ref<string>("");
const modeType = ref<any>("");
const rowData = ref<InfoUser | null>(null);
const openDialog = (title: string, mode: string, row?: InfoUser) => {
  isOpen.value = true;
  dialogTitle.value = title;
  modeType.value = mode;
  rowData.value = row || null;
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

const handleComplete = () => {
  getPerRolesUpdate();
  isOpen.value = false;
  isDelopen.value = false;
};
</script>
<template>
  <div class="content-flex">
    <el-card
      style="width: 220px; height: 100%; margin-right: 20px"
      shadow="never"
    >
      <template #header>
        <div>
          <span>部门列表</span>
        </div>
      </template>
      <el-menu
        text-color="#606266"
        active-text-color="#000"
        @select="handleSelectDep"
      >
        <el-menu-item index="网站运维部">网站运维部</el-menu-item>
        <el-menu-item index="网络运维部">网络运维部</el-menu-item>
        <el-menu-item index="行政秘书部">行政秘书部</el-menu-item>
        <el-menu-item index="信息化运维部">信息化运维部</el-menu-item>
      </el-menu>
    </el-card>
    <el-card style="width: 100%; height: 100%" shadow="never">
      <template #header>
        <div class="card-header">
          <div>
            <span style="margin-right: 10px">姓名</span>
            <el-input
              v-model="name"
              style="width: 240px; margin-right: 20px"
              placeholder="请输入"
              clearable
            />
            <el-button
              type="primary"
              :icon="Search"
              @click="searchName(name)"
              :disabled="name == '' || null ? !isDisabled : isDisabled"
              >查询</el-button
            >
            <el-button :icon="Refresh" @click="handleLoading">刷新</el-button>
          </div>
          <!-- <div>
            <el-button
              type="success"
              :icon="Plus"
              @click="openDialog('新增用户', 'add')"
              >新增</el-button
            >
          </div> -->
        </div>
      </template>
      <el-table
        :data="tableData()"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column fixed type="index" label="序号" width="60" />
        <el-table-column prop="id" label="学号" width="160" />
        <el-table-column prop="username" label="姓名" width="120" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? "在职" : "退休" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="120" />
        <el-table-column fixed="right" label="操作" min-width="180">
          <template #default="scope">
            <el-button
              type="primary"
              @click="openDialog('编辑用户', 'edit', scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="
                opendelDialog(scope.row.id, '确定删除该成员？', deleteRole)
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="prev, pager, next, total"
          :total="page.total"
        />
      </template>
    </el-card>
  </div>

  <UserInfoDialog
    ref="roleInfoDialog"
    :open="isOpen"
    :title="dialogTitle"
    :formData="rowData"
    :mode="modeType"
    @close="isOpen = false"
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
<style scoped>
.el-menu {
  border: none;
}
.el-menu-item.is-active {
  background-color: #f5f7fa;
}
.content-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
.el-pagination > .el-pagination__total {
  float: right;
}
</style>
