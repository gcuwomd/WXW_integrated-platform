<template>
  <div class="w-screen bg-white bg-contianer min-h-100vh">
    <div class="flex">
      <div class="left w-20% p-20px">
        <div class="card" style="position: relative">
          <div class="img">
            <img
              src="/images/userimg.png"
              alt=""
              class="w-100%"
              style="border-radius: 30%"
              @click="toclick()"
            />
          </div>
          <div class="info">
            <span>{{ user.username }}</span>
            <p>{{ user.department }}</p>
          </div>
        </div>
      </div>
      <div
        class="right w-70% flex flex-wrap mb-40px items-start justify-start"
        style="justify-content: flex-start; align-items: flex-start"
      >
        <Syscards
          :SysName="item.clientName"
          :url="item.url"
          :id="item.clientId"
          :status="item.status"
          :clientSecret="item.clientSecret"
          v-for="item in systems"
        />
      </div>
    </div>
    <div
      class="text-18px font-semibold flex fixed buttom-0"
      style="
        position: absolute;
        bottom: 0px;
        right: 10px;
        flex-direction: column;
      "
    >
      <!-- From Uiverse.io by Faizuddinq -->
      <ul class="example-2">
        <li class="icon-content">
          <div
            aria-label="Pinterest"
            data-social="pinterest"
            @click="opendrawer('organization')"
          >
            <div class="filled"></div>
            <img src="/public/images/orgnization.png" alt="" />
          </div>
          <div class="tooltip">组织介绍</div>
        </li>
        <li class="icon-content">
          <div
            aria-label="Spotify"
            data-social="spotify"
            @click="opendrawer('department')"
          >
            <div class="filled"></div>
            <img src="/public/images/department.png" alt="" />
          </div>
          <div class="tooltip">部门概况</div>
        </li>
        <li class="icon-content">
          <div
            aria-label="Dribbble"
            data-social="dribbble"
            @click="opendrawer('live')"
          >
            <div class="filled"></div>
            <img src="/public/images/guidence.png" alt="" />
          </div>
          <div class="tooltip">组织生活</div>
        </li>
        <!-- <li class="icon-content">
          <a
            href="https://telegram.org/"
            aria-label="Telegram"
            data-social="telegram"
          >
            <div class="filled"></div>
          </a>
          <div class="tooltip">Telegram</div>
        </li> -->
        <li class="icon-content">
          <div aria-label="Dribbble" data-social="dribbble">
            <!-- <div class="filled"></div> -->
            <img src="/public/images/list.png" alt="" />
          </div>
        </li>
      </ul>
      <!-- <el-button
        type="primary"
        style="margin-left: 16px"
        @click="drawer = true"
      >
        open
      </el-button> -->
      <div
        class="flex items-center justify-center"
        style="margin: 0 10px 10px 0px"
      >
        <span class="text-#353e54">学生网络与信息工作委员会</span>
        <img src="../../public/images/wxw.png" alt="" class="w-40px h-40px" />
      </div>
    </div>
  </div>
  <el-drawer
    v-model="drawer"
    :direction="direction"
    style="color: black"
    size="50%"
    title="学生网络与信息工作委员会"
  >
    <Organization v-if="activeModule === 'organization'" />
    <Department v-if="activeModule === 'department'" />
    <Live v-if="activeModule === 'live'" />
  </el-drawer>
</template>

<script setup lang="ts">
import Syscards from "../components/syscards.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { system } from "../type/respon-data";
import { getsystemList } from "../api/methods/system";
import Organization from "../components/drawer/orgnization.vue";
import Department from "../components/drawer/department.vue";
import Live from "../components/drawer/live.vue";
import type { DrawerProps } from "element-plus";
const direction = ref<DrawerProps["direction"]>("rtl");
let systems = ref<system[]>([]);
const drawer = ref(false); //抽屉显示
let activeModule = ref("");
const opendrawer = (modul: string) => {
  drawer.value = true;
  activeModule.value = modul;
};

// 获取system列表
const getsyslist = async () => {
  let data = (await getsystemList()).data;
  systems.value = data;
};

const toclick = () => {
  router.push("/personal");
};

import { getUserInformation } from "../api/methods/userInformation";
import { userList } from "../type/respon-data";
import { useStore } from "../store/user.ts";

const user = ref<userList>({
  id: "",
  username: "",
  departmentId: null,
  department: "",
  grade: null,
  roleId: null,
  role: "",
  avatar: "",
  email: "",
  phone: "",
  createTime: "",
  status: null,
});

// 获取个人信息请求
const getUser = async () => {
  let data = (await getUserInformation()).data;
  const store = useStore();
  user.value = data;
  console.log(user.value);
  // 存储用户id roleid 部门id
  store.userid = user.value.id;
  store.roleId = user.value.roleId;
  store.departmentId = user.value.departmentId;
  store.avatar = user.value.avatar;
};
onMounted(async () => {
  await getUser();
  await getsyslist();
});
</script>

<style scoped>
/* From Uiverse.io by benjimich */
.card {
  width: 160px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f3;
  border-radius: 12px;
  box-shadow: inset 2px 2px 10px #a9a9aa77, inset -5px -5px 10px #ffffff7e;
}

.card .img {
  height: 100px;
  margin-top: 1.6em;
  aspect-ratio: 1;
  border-radius: 30%;
  background: #f2f2f3;
  margin-bottom: 0.4em;
  box-shadow: -5px -5px 8px #ffffff7a, 5px 5px 8px #a9a9aa7a;
}

.card .info {
  text-align: center;
  margin-top: 0.4em;
  background: linear-gradient(
    120deg,
    rgba(0, 194, 255, 1) 0%,
    rgba(0, 86, 255, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card .info > span {
  font-weight: bold;
  font-size: 1.2em;
}

.card a {
  margin-top: 1em;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(
    90deg,
    rgba(0, 194, 255, 1) 0%,
    rgba(0, 86, 255, 1) 100%
  );
  padding: 0.5em 2em;
  border-radius: 0.7em;
}

.card a:active {
  box-shadow: inset 3px 3px 3px #0056ff, inset -3px -3px 3px #00c2ff;
}
.bg-contianer {
  background-image: url("../../public/images/bg11.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0;
}
/* .............. */
/* From Uiverse.io by Faizuddinq */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.example-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-self: end;
  position: relative;
  height: auto;
  padding: 10px 0;
  width: 50px;
  margin-right: 10px;
}

.example-2 .icon-content {
  margin: 0 10px;
  position: relative;
  transition: all 0.3s ease;
}

/* 默认隐藏除最后一个外的所有图标 */
.example-2 .icon-content:not(:last-child) {
  opacity: 0;
  transform: translateX(20px);
  pointer-events: none;
}

/* 悬停在ul上或最后一个图标上时显示其他图标 */
.example-2:hover .icon-content:not(:last-child),
.example-2 .icon-content:last-child:hover ~ .icon-content:not(:last-child) {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.example-2 .icon-content .tooltip {
  position: absolute;
  top: -10px;
  right: 100px;
  transform: translateX(50%);
  color: #fff;
  padding: 0px 10px;
  border-radius: 15px;
  opacity: 0;
  visibility: hidden;
  font-size: 14px;
  transition: all 0.3s ease;
  width: 60px;
  z-index: 1000;
}

.example-2 .icon-content:hover .tooltip {
  opacity: 1;
  visibility: visible;
  top: 1px;
}

.example-2 .icon-content div {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 20%;
  color: #4d4d4d;
  background-color: #ffff;
  transition: all 0.3s ease-in-out;
  margin: 0px;
}

.example-2 .icon-content div {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 50%);
}

.example-2 .icon-content div:hover {
  color: white;
}

.example-2 .icon-content div .filled {
  position: absolute;
  top: auto;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #000;
  transition: all 0.3s ease-in-out;
}

.example-2 .icon-content div:hover .filled {
  height: 100%;
}

.example-2 .icon-content div[data-social="spotify"] .filled,
.example-2 .icon-content div[data-social="spotify"] ~ .tooltip {
  background-color: #0088cc;
}

.example-2 .icon-content div[data-social="pinterest"] .filled,
.example-2 .icon-content div[data-social="pinterest"] ~ .tooltip {
  background-color: #bd081c;
}

.example-2 .icon-content div[data-social="dribbble"] .filled,
.example-2 .icon-content div[data-social="dribbble"] ~ .tooltip {
  background-color: #ea4c89;
}

.example-2 .icon-content div[data-social="telegram"] .filled,
.example-2 .icon-content div[data-social="telegram"] ~ .tooltip {
  background-color: #0088cc;
}

li img {
  width: 70%;
  height: 70%;
  z-index: 100;
  transition: transform 0.3s ease;
}

.example-2 .icon-content:hover img {
  transform: scale(1.1);
}
.el-drawer__header {
  margin-bottom: -5px !important;
}
:deep(.header) {
  margin-bottom: -5px !important;
}
.bg-img {
  overflow: hidden;
  background: url("/public/images/wxw-bg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 450px;
  background-attachment: fixed;
  /* z-index: -1; */
}
</style>
