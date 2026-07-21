<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAppStore } from "../../store/index";

const route = useRoute();
const store = useAppStore();
// 将访问的 活动 id name 存在 store 中
store.activityName = route.query.activityName as string;
store.activityId = Number(route.query.activityId);
</script>
<template>
  <div class="content-flex">
    <el-card
      style="width: 20%; height: 100%; margin-right: 10px"
      shadow="never"
    >
      <template #header>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <img src="../../assets/favicon.png" alt="" class="act-icon" />
          <span>{{ store.activityName }}</span>
        </div>
      </template>
      <el-menu router text-color="#606266" active-text-color="#000">
        <el-menu-item index="/activity/ActivityDetails/ActivityList"
          >成员名单</el-menu-item
        >
        <el-menu-item index="/activity/ActivityDetails/Assessment"
          >考核管理</el-menu-item
        >
        <el-menu-item index="/activity/ActivityDetails/Bind"
          >评分绑定</el-menu-item
        >
      </el-menu>
    </el-card>
    <div style="width: 79%; height: 100%">
      <RouterView />
    </div>
  </div>
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
.act-icon {
  width: 60px;
  height: 60px;
}
</style>
