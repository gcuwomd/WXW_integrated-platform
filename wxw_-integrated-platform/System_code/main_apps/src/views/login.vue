<template>
  <div class="flex h-screen w-screen">
    <div class="bg-#353e54 w-50% p-10px flex flex-col">
      <div class="text-18px font-semibold flex items-center w-100%">
        <img src="../../public/images/wxw.png" alt="" class="w-40px h-40px" />
        <p>学生网络与信息工作委员会</p>
      </div>
      <div class="mt-50px flex items-center flex-col">
        <img src="../../public//images/login-box-bg.svg" alt="" class="w-55%" />
        <div class="text-30px">欢迎使用本系统</div>
      </div>
    </div>
    <div
      class="bg-#ffffff w-50% flex flex-col items-center Wp-10px bg-contianer"
    >
      <p class="text-[#353e54] font-semibold text-45px mb-80px mt-130px">
        登 录
      </p>
      <button
        class="bg-#4db6ac w-70% h-50px text-20px"
        @click="toregister()"
        style="color: aliceblue"
      >
        统一认证平台登录
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import router from "../router";
// import { useStore } from "../store/user";

const toregister = () => {
  // if (import.meta.env.DEV) {
  //   // 开发/测试环境：设置测试 Token 后跳转，路由守卫会检查 token
  //   const store = useStore();
  //   store.token = "dev-test-token";
  //   router.push("/integration");
  // } else {
    // 生产环境：跳转到统一认证平台 OAuth2 登录页面
    window.location.href =
      "https://auth.gcu.edu.cn/application/oauth/redirect?client_id=123456&callbackUrl=https%3A%2F%2Fnc-wxwjc.gcu.edu.cn%2F%23%2Flogin&redirect_uri=https%3A%2F%2Fnc-wxwjc.gcu.edu.cn%2F%23%2Flogin";
  // }
};
</script>

<style scoped>
.bg-contianer {
  background-image: url("../../public/images/bg11.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0;
}
</style>
