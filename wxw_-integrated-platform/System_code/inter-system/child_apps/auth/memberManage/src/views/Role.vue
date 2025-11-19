<script setup lang="ts"></script>
<template>
  <!-- 一个角色 可能对应多个权限组 每个权限组 里有多个权限 -->
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
  >
  <el-menu-item index="/role/Permission">权限</el-menu-item>
  <el-menu-item index="/role/PermissionGroup">权限组</el-menu-item>
  </el-menu>
  <el-main> <router-view /></el-main>
</template>
<style scoped></style>
