<script lang="ts" setup>
import Asider from "../components/Asider.vue";
</script>

<template>
  <div class="flex-col h-screen w-screen" style="background-color: azure">
    <el-header
      style="
        background-color: #2b2b2b;
        color: black;
        height: 60px;
        display: flex;
        align-items: center;
      "
    >
      <img
        src="../../public/img/wxw.png"
        alt=""
        style="width: 50px; height: 50px"
      />
      <p
        style="color: #ffffff; font-size: 15px; align-self: end"
        class="mb-10px"
      >
        学生网络与信息工作委员会签到系统
      </p>
    </el-header>
    <el-container
      style="width: 100%; background-color: aliceblue"
      class="flex-grow w-full"
    >
      <el-aside width="15%" style="height: 100%; background-color: #ffffff"
        ><Asider
      /></el-aside>
      <el-main style="margin: 0; padding: 0; box-sizing: border-box"
        ><router-view
      /></el-main>
    </el-container>
  </div>
</template>

<style>
.main {
  background-image: url("../../public/img/bg11.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0;
}
</style>
