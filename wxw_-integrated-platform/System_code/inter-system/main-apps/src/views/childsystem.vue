<template>
  <div
    class="bg-contianer w-screen bg-white"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <micro-app
      :name="name"
      :url="url"
      iframe
      keep-alive
      @created="created"
      @beforemount="beforemount"
      @mounted="mounted"
      @unmount="unmount"
      @error="error"
      :sandbox="['allow-scripts', 'allow-same-origin']"
    ></micro-app>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
// import { EventCenterForMicroApp } from "@micro-zoe/micro-app";
import { ref } from "vue";
const route = useRoute();
const name = ref<string>("");
const url = ref<string>("");
const clientId = ref<number>(0);
const fullscreenLoading = ref(false);
// :data="microAppData"
// const microAppData = ref<{}>({ msg: "" });
name.value = route.query.name as string;
url.value = route.query.url as string;
clientId.value = Number(route.query.cid as unknown as string);

declare global {
  interface Window {
    eventCenterForAppNameVite: any;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_ENVIRONMENT__: string;
    __MICRO_APP_BASE_APPLICATION__: string;
  }
}

// window.eventCenterForAppNameVite = new EventCenterForMicroApp("Sign-system");

const created = () => {
  console.log("micro-app元素被创建");
  // console.log(window.eventCenterForAppNameVite.getData().msg);
  // dataForChild.value = { msg: "主向子传数据" };
  // microApp.setData("Sign-system", { msg: "主向子传新的数据" }); // 传数据
};

const beforemount = () => {
  console.log("即将渲染");
  fullscreenLoading.value = true;
};

const mounted = () => {
  console.log("已经渲染完成");
  fullscreenLoading.value = false;
};

const unmount = () => {
  console.log("已经卸载");
};

const error = () => {
  console.log("加载出错");
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
