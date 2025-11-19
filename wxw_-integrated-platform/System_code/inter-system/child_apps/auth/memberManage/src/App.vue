<script setup lang="ts">
import Header from "./views/layout/Header.vue";
import Aside from "./views/layout/Aside.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto"><Aside /></el-aside>
      <el-container>
        <el-header style="padding: 0 5px">
          <Header />
        </el-header>
        <el-main style="background-color: #f5f7f9"><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  min-width: 720px;
}
.el-progress {
  display: block;
  position: fixed;
  width: 100%;
  z-index: 100;
}
</style>
