<template>
  <el-menu class="h-screen">
    <div v-for="(item, index) in route">
      <el-menu-item
        v-if="item.name != '签到具体信息'"
        :index="`${index}`"
        style="color: steelblue; width: 100%; height: 100%; font-size: 17px"
        @click="router.push(item.path)"
      >
        {{ item.name }}
      </el-menu-item>
      <!-- <el-sub-menu :index="`${index}`" v-else>
        <template #title>
          <p style="color: steelblue; font-size: 17px">{{ item.name }}</p>
        </template>
        <div
          v-for="subitem in item.children"
          style="width: 100%; height: 40px; font-size: 13px"
          class="flex items-center justify-center"
        >
          <router-link
            :to="subitem.path"
            style="color: steelblue; width: 100%; height: 100%"
            >{{ subitem.name }}</router-link
          >
        </div>
      </el-sub-menu> -->
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
</script>

<style scoped></style>
