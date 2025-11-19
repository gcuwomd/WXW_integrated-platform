<template>
  <div class="w-screen bg-white flex justify-center items-center h-screen">
    <img src="../../public/images/main.png" alt="" class="w-40%" />
    <div class="flex flex-col ml-20px" style="">
      <span>项目维护中</span>
      <span class="mb-100px">敬请期待..</span>
      <button @click="tohome()" class="bg-#4db6ac w-70% h-50px text-20px">
        返回主页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const tohome = () => {
  router.push("/integration");
};
</script>

<style scoped>
span {
  font-family: "Work Sans", sans-serif;
  background: linear-gradient(to right, #95f8d7, #72bbf6); /* 渐变背景 */
  font-weight: 800;
  font-size: 70px;
  -webkit-background-clip: text; /* 渐变背景 */
  color: transparent; /* 文字颜色透明，以便显示背景渐变 */
}
</style>
