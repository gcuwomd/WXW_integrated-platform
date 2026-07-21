<template>
  <div>
    <el-card class="content-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button @click="router.back()" :icon="ArrowLeft">返回</el-button>
          <el-text style="margin-left: 20px" size="large">
            成员 {{ username }}</el-text
          >
        </div>
      </template>
      <div class="card-body">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f5f7fa',
            color: '#909399',
          }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column prop="activityName" label="活动名称" />
          <el-table-column prop="description" label="活动描述">
            <template #default="scope">
              <span
                :class="{
                  evaluated: scope.row.description !== null,
                  'not-evaluated': scope.row.description === null,
                }"
              >
                {{
                  scope.row.description !== null
                    ? "暂无描述"
                    : scope.row.description
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="activityStatus" label="评分状态">
            <template #default="scope">
              <span
                :class="{
                  evaluated: scope.row.totalScore !== null,
                  'not-evaluated': scope.row.totalScore === null,
                }"
              >
                {{ scope.row.totalScore !== null ? "已评" : "未评" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="totalScore" label="活动总分" />
          <el-table-column prop="year" label="学年" />
          <el-table-column prop="" label="操作">
            <template #default="scope"
              ><el-button
                type="primary"
                plain
                @click="
                  router.push({
                    path: '/detail',
                    query: {
                      activityName: scope.row.activityName,
                      userId: id,
                    },
                  })
                "
              >
                跳转评分
              </el-button></template
            >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { userActEvalute } from "../type/response-data";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
const username = route.query.username;
const id = route.query.id;
import router from "../router";
const tableData = ref<userActEvalute[]>([]);
import { getUserIndicatorsByUserId } from "../api/methods/rules/rules";

onMounted(async () => {
  //@ts-ignore
  await getUserIndicatorsByUserId(id).then((response) => {
    if (response.data) {
      //@ts-ignore
      tableData.value = response.data;
    }
  });
});
</script>

<style scoped></style>
