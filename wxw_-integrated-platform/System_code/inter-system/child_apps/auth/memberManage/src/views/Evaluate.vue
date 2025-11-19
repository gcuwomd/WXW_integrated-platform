<script setup lang="ts">
import { Search, Refresh } from "@element-plus/icons-vue";
import { useAppStore } from "../store";
import { userEvalute } from "../type/response-data";
import router from "../router";
import AddActivity from "../components/dialog/AddActivity.vue";
import { getEvalute } from "../api/methods/evaluate/evaluate";
import { getYear } from "../api/methods/year/year";
const appStore = useAppStore();
const tableData = ref<userEvalute[]>([]);

const name = ref<string>("");
const isDisabled = ref(false);
const loading = ref<boolean>(false);
// const page = ref({
//   page: 1,
//   size: 10,
//   pageCount: 7,
//   total: 100,
// });
//从pinia里面拿取用户信息,筛选所需信息
const filterData = (newItem: string | number) => {
  tableData.value = appStore.evaluateInfos.filter(
    (item) =>
      item.departmentName == newItem ||
      item.username == newItem ||
      item.year == newItem
  );
};
const searchName = (name: string) => {
  filterData(name);
};

//刷新表格,重新获取全部数据
const handleLoading = () => {
  tableData.value = appStore.evaluateInfos;
};

//打开评价详情页
const openEvaluateInfo = (id: string, username: string) => {
  router.push({
    name: "个人某活动评价详情",
    query: { id: id, username: username },
  });
};

const isOpen = ref<boolean>(false);
//新增活动，参与人员、活动名称、活动描述

onMounted(async () => {
  await getAllevaluate(); //一进来 获取全部信息
  await getyear(); //获取年份
  await filterData("网站运维部"); //默认筛选网站运维部
});

// 通过年份 进行获取 所有人员的评分
// 前端存储 然后再进行分部门
const getAllevaluate = () => {
  getEvalute(null).then((response) => {
    if (response.data) {
      tableData.value = response.data;
      //将 全部数据 存储 到 store 里面
      appStore.evaluateInfos = response.data;
    }
  });
};
const handleSelectDep = (index: string) => {
  filterData(index);
};
const options = ref<any[]>([]);
const getyear = async () => {
  await getYear().then((response) => {
    if (response.data) {
      options.value = response.data.map((item: any) => {
        return {
          value: item.replace("学年", ""),
          label: item,
        };
      });
    }
  });
};
const selectyear = ref<string>();

watch(selectyear, (newVal) => {
  if (newVal) {
    filterData(newVal);
  }
});
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
            <span style="margin: 0 20px">学年</span>
            <el-select
              v-model="selectyear"
              placeholder="Select"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </template>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="userId" label="学号" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="year" label="学年" />
        <el-table-column prop="totalScore" label="总分" />
        <el-table-column fixed="right" label="操作" min-width="140">
          <template #default="scope">
            <el-button
              type="success"
              link
              @click="openEvaluateInfo(scope.row.userId, scope.row.username)"
              >评价详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <template #footer>
        <el-pagination
          v-model:current-page="page.page"
          v-model:page-size="page.size"
          :pager-count="page.pageCount"
          layout="prev, pager, next, total"
          :total="page.total"
        />
      </template> -->
    </el-card>
  </div>
  <AddActivity :open="isOpen" @close="isOpen = false" />
</template>
<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
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
