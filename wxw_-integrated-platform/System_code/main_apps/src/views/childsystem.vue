<template>
  <div class="bg-contianer w-screen bg-white">
    <micro-app
      ref="microAppRef"
      :name="name"
      :url="url"
      iframe
      @created="created"
      @beforemount="beforemount"
      @mounted="mounted"
      @unmount="unmount"
      @error="error"
    ></micro-app>
  </div>
</template>

<script setup lang="ts">
console.log("=== childsystem.vue 组件初始化 ===");
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch, nextTick } from "vue";
import { useStore } from "@/store/user"; // 导入用户 store
import microAppApi from "@micro-zoe/micro-app"; // 导入 micro-app API (重命名避免与<micro-app>标签冲突)

const route = useRoute();
const router = useRouter(); // 获取路由实例
const userStore = useStore();
const name = ref<string>("");
const url = ref<string>("");
const clientId = ref<number>(0);
const fullscreenLoading = ref(false);
const microAppRef = ref<any>(null);

name.value = route.query.name as string;
url.value = route.query.url as string;
clientId.value = Number(route.query.cid as unknown as string);
console.log("childsystem 路由参数 name=", name.value, "url=", url.value, "cid=", clientId.value);

// 生产环境下，直接使用数据库中配置的URL
// 开发环境下，如需使用本地子应用，取消下方注释并配置端口
/*
if (import.meta.env.DEV) {
  const devUrlMap: Record<string, string> = {
    SignIn: "http://localhost:5173/",
    "Auth-system": "http://localhost:5174/",
    RecruitNewPeople: "http://localhost:5175/",
    Permission: "http://localhost:5176/",
  };
  if (devUrlMap[name.value]) {
    url.value = devUrlMap[name.value];
  }
}
*/

declare global {
  interface Window {
    eventCenterForAppNameVite: any;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_ENVIRONMENT__: string;
    __MICRO_APP_BASE_APPLICATION__: string;
  }
}

// window.eventCenterForAppNameVite = new EventCenterForMicroApp("Sign-system");

// 向子应用发送数据的函数
const sendDataToChild = () => {
  if (!name.value) return;
  
  const data = {
    token: userStore.token || "", // 传递 Token
    userInformation: {
      userid: userStore.userid,
      roleId: userStore.roleId,
      departmentId: userStore.departmentId,
      code: userStore.code,
      avatar: userStore.avatar,
    },
  };
  
  console.log(`主应用向子应用 ${name.value} 发送数据:`, data);
  microAppApi.setData(name.value, data);
};

const created = () => {
  console.log("micro-app元素被创建");
};

const beforemount = () => {
  console.log("即将渲染，立即发送数据给子应用");
  fullscreenLoading.value = true;
  // 关键：在子应用挂载前发送数据，确保子应用 handleMicroData 中 getData() 能获取到 Token
  sendDataToChild();
};

const mounted = () => {
  console.log("已经渲染完成");
  fullscreenLoading.value = false;
  // 子应用挂载完成后，立即发送数据
  sendDataToChild();
};

const unmount = () => {
  console.log("已经卸载");
};

const error = (e: any) => {
  console.error("micro-app 加载出错:", e);
};

// 监听路由变化，确保每次进入子应用都重新发送数据
watch(
  () => route.query,
  () => {
    name.value = route.query.name as string;
    url.value = route.query.url as string;
    clientId.value = Number(route.query.cid as unknown as string);
  }
);

// 组件挂载时
onMounted(async () => {
  // 等 DOM 更新后，检查 micro-app 元素
  await nextTick();
  console.log("onMounted: micro-app 元素状态检查");
  console.log("  microAppRef.value:", microAppRef.value);
  if (microAppRef.value) {
    console.log("  micro-app tagName:", microAppRef.value.tagName);
    console.log("  micro-app innerHTML:", microAppRef.value.innerHTML?.substring(0, 200));
    console.log("  micro-app childNodes:", microAppRef.value.childNodes?.length);
    console.log("  micro-app shadowRoot:", microAppRef.value.shadowRoot);
  } else {
    console.error("  microAppRef.value 为 null/undefined！");
  }

  // 检查 customElements 是否注册了 micro-app
  const MicroAppClass = customElements.get("micro-app");
  console.log("  customElements.get('micro-app'):", MicroAppClass);
  if (!MicroAppClass) {
    console.error("  ❌ micro-app 未注册为自定义元素！microApp.start() 可能失败或未执行！");
  }

  // 也检查 document 中的 micro-app
  const allMicroApps = document.querySelectorAll("micro-app");
  console.log("  document 中 micro-app 数量:", allMicroApps.length);
  allMicroApps.forEach((el, i) => {
    console.log(`  micro-app[${i}]: name=${el.getAttribute("name")}, url=${el.getAttribute("url")?.substring(0, 50)}, constructor=${el.constructor.name}`);
  });

  // 监听来自子应用的消息（返回主页）
  if (name.value) {
    microAppApi.addDataListener(name.value, (data: any) => {
      console.log(`收到子应用 ${name.value} 发送的数据:`, data);
      if (data?.type === "go-to-main" && data?.path) {
        console.log(`跳转到: ${data.path}`);
        router.push(data.path);
      }
    });
  }

  // 延迟发送，确保子应用已初始化
  setTimeout(() => {
    sendDataToChild();
  }, 500);
});
</script>

<style scoped>
.bg-contianer {
  background-image: url("../../public/images/bg11.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

<!-- 非 scoped: 确保 micro-app 及其内部 iframe 有正确的尺寸 -->
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
}
.bg-contianer micro-app {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
.bg-contianer micro-app iframe {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}
</style>
