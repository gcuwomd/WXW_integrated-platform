<script setup lang="ts"></script>
<template>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="/ReviewSituation/Fan">饼状图</el-menu-item>
    <el-menu-item index="/ReviewSituation/Histogram">直方图</el-menu-item>
  </el-menu>
  <el-main><router-view /></el-main>
</template>
<style scoped></style>
