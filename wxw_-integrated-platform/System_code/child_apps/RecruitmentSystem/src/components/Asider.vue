<template>
  <el-menu class="">
    <!-- 返回主页按钮 -->
    <el-menu-item
      index="back-home"
      style="color: steelblue; width: 100%; height: 100%; font-size: 17px; background-color: #e8f4fd; border-bottom: 1px solid #dcdfe6;"
      @click="goBackToMain"
    >
      🏠 返回主页
    </el-menu-item>
    
    <div v-for="(item, index) in route">
      <el-menu-item
        :index="`${index}`"
        style="color: steelblue; width: 100%; height: 100%; font-size: 17px"
        @click="
          {
            router.replace(item.path);
            
          }
        "
      >
        {{ item.name }}
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import routes from "../router/routers";
import { RouteRecordRaw } from "vue-router";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const route = ref<RouteRecordRaw[]>([]);
route.value = routes.options.routes[0].children as RouteRecordRaw[];

// 返回基座主页
const goBackToMain = () => {
  // 通过 micro-app API 通知主应用切换路由
  if (window.microApp) {
    window.microApp.dispatch({ type: 'go-to-main', path: '/integration' });
  }
  // 或者直接操作父窗口路由（备选方案）
  // if (window.parent && window.parent !== window) {
  //   window.parent.location.hash = '#/integration';
  // }
};
</script>

<style scoped></style>
