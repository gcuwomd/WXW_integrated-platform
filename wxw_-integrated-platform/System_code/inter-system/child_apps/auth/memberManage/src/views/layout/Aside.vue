<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiFileDocumentEditOutline,
  mdiAccountMultipleOutline,
  mdiAccountOutline,
  mdiApps,
  mdiDnsOutline,
} from "@mdi/js";
import emitter from "../../utils/eventbus.ts";
import { useRoute } from "vue-router";

const route = useRoute();
const isCollapse = ref<boolean>(false);
const defaultMenu = computed(() => {
  return route.path;
});

onMounted(() => {
  emitter.on("collInfo", (info: any) => {
    isCollapse.value = info;
  });
});
</script>

<template>
  <el-menu
    :default-active="defaultMenu"
    class="el-menu-container"
    :collapse="isCollapse"
    background-color="#2e3f50"
    text-color="#FFFFFF"
    active-text-color="#409eff"
  >
    <el-menu-item>
      <img class="wxwImg" src="../../assets/favicon.png" />
      <template #title>
        <div class="wxwText">网信委成员管理系统</div>
      </template>
    </el-menu-item>
    <router-link to="/evaluate" class="router-link">
      <el-menu-item index="/evaluate" class="bg-active">
        <div class="icon">
          <svg-icon type="mdi" :path="mdiFileDocumentEditOutline"></svg-icon>
        </div>
        <template #title> 成员评价 </template>
      </el-menu-item>
    </router-link>
    <router-link to="/member" class="router-link">
      <el-menu-item index="/member">
        <div class="icon">
          <svg-icon type="mdi" :path="mdiAccountMultipleOutline"></svg-icon>
        </div>
        <template #title> 成员信息 </template>
      </el-menu-item>
    </router-link>
    <router-link to="/role" class="router-link">
      <el-menu-item index="/role">
        <div class="icon">
          <svg-icon type="mdi" :path="mdiAccountOutline"></svg-icon>
        </div>
        <template #title> 权限管理 </template>
      </el-menu-item>
    </router-link>
    <router-link to="" class="router-link">
      <el-sub-menu index="">
        <template #title>
        <div class="icon">
          <svg-icon type="mdi" :path="mdiApps"></svg-icon>
        </div>
        <span :class="{'text-none':isCollapse }">活动管理</span>
        </template>
        <el-menu-item index="/activity/activityManage"
          ><router-link to="/activity/ActivityManage" class="router-link"
            >活动管理</router-link
          ></el-menu-item
        >
        <el-menu-item index="/activity/rulesManage"
          ><router-link to="/activity/RulesManage" class="router-link"
            >细则管理</router-link
          ></el-menu-item
        >
      </el-sub-menu>
    </router-link>
    <router-link to="/system" class="router-link">
      <el-menu-item index="/system">
        <div class="icon">
          <svg-icon type="mdi" :path="mdiDnsOutline"></svg-icon>
        </div>
        <template #title> 子系统管理 </template>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style scoped>
.wxwImg {
  width: 30px;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5%;
}
.router-link {
  text-decoration: none;
  color: #fff;
  width: 100%;
  height: 100%;
}
.el-menu-item.is-active {
  background-color: #e2e6fae8;
}

.el-menu-container {
  height: calc(100vh);
}
.el-menu-container:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh);
}
.text-none{
  display: none;
}
</style>
