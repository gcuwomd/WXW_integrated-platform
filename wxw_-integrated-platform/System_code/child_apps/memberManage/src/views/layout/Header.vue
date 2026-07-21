<script setup lang="ts">
import emitter from "../../utils/eventbus.ts";
import { Expand, Fold } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
const menuIcon = ref<boolean>(false);
const cpLeft = () => {
  menuIcon.value = !menuIcon.value;
  emitter.emit("collInfo", menuIcon.value); //通过mitt的emit把menuL传递出去，collInfo传参名称
};
</script>
<template>
  <div class="disflex">
    <el-button class="btn" size="large" @click="cpLeft" text>
      <el-icon :size="25" v-if="menuIcon"><Expand /></el-icon>
      <el-icon :size="25" v-if="!menuIcon"><Fold /></el-icon>
    </el-button>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/evaluate' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ route.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style scoped>
.disflex {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.btn {
  height: 100%;
  padding: 10px;
}
.el-breadcrumb {
  font-size: 16px;
}
</style>
