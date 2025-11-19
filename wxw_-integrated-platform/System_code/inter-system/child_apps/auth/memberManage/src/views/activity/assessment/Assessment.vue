<script setup lang="ts">
import { getPeople } from "../../../api/methods/activity/activity";
import { useAppStore } from "../../../store";
import { useRequest } from "alova/client";
const store = useAppStore();

const allTableData = ref<any[]>([
  {
    username: "111",
    id: "111",
    department: "111",
    activityScore: "111",
    activityStatus: 0,
  },
]);

//@ts-ignore
const { onSuccess: getPeopleSuccess, send: update } = useRequest(() =>
  getPeople(store.activityId)
);
getPeopleSuccess((res: any) => {
  if (res.data.code == 200) {
    allTableData.value = res.data.data;
    console.log(res);
  }
});

const page = reactive<{
  currentPage: number;
  size: number;
  total: number;
}>({
  currentPage: 1,
  size: 10,
  total: 10,
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
</script>
<template>
  <el-card style="width: 100%; height: 100%" shadow="never">
    <template #header>
      <div class="card-header">
        <el-button>导出</el-button>
      </div>
    </template>
    <el-table :data="tableData()" style="width: 100%">
      <el-table-column prop="userName" label="姓名" width="180" />
      <el-table-column prop="userId" label="学号" width="180" />
      <el-table-column prop="departmentName" label="部门" width="180" />
      <el-table-column prop="totalScore" label="活动分数" width="180">
        <template #default="scope">
          <el-tag :type="scope.row.totalScore === null ? 'warning' : 'success'">
            {{ scope.row.totalScore === null ? "未评" : scope.row.totalScore }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="评分" min-width="180">
        <template #default="scope"
          ><router-link
            :to="{
              path: '/detail',
              query: {
                activityName: store.activityName,
                userId: scope.row.userId,
              },
            }"
          >
            <el-button link type="primary" size="small">评分</el-button>
          </router-link></template
        >
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
</template>
<style scoped></style>
