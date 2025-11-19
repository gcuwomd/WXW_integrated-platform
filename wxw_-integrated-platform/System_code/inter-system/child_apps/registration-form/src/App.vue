<script setup lang="ts"></script>
<template>
  <div>
    <!-- h2 标签中是固定内容，每次使用路由都会加载 -->
    <h2>
      <span>网信委招新报名表单</span>
      <img src="./assets/logo.png" alt="" />
    </h2>
    <router-view></router-view>
  </div>
</template>
