<script setup lang="ts"></script>
<template>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="/Statistics/Nopass">未通过人员信息</el-menu-item>
    <el-menu-item index="/Statistics/Pass">通过人员信息</el-menu-item>
    <el-menu-item index="/Statistics/Willpass">未处理人员信息</el-menu-item>
  </el-menu>
  <el-main> <router-view /></el-main>
</template>
<style scoped></style>
