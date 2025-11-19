<template>
  <el-menu class="">
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

</script>

<style scoped></style>
