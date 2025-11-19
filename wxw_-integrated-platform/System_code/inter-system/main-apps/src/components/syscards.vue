<template>
  <div>
    <div class="courses-container">
      <div class="course">
        <div
          class="course-preview"
          style="overflow: hidden; word-wrap: break-word; word-break: break-all"
        >
          <h6>Member</h6>
          <h2>{{ props.SysName }}</h2>
        </div>
        <div class="course-info">
          <div class="progress-container">
            <div class="progress"></div>
          </div>
          <button class="btn" @click="tochild()">进入系统</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SysCard {
  SysName: string;
  url: string;
  id: number;
  status: number;
  clientSecret: string;
}
const props = defineProps<SysCard>();
import { useRouter } from "vue-router";
import { getchildcode } from "../api/methods/system";
const router = useRouter();
import { useStore } from "../store/user.ts";
const store = useStore();
import microApp from "@micro-zoe/micro-app";
//子系统需要数据
const userInformation = {
  id: store.userid,
  departmentId: store.departmentId,
  roleId: store.roleId,
};

const tochild = async () => {
  if (props.status == 1) {
    router.push({
      name: "Childsystem",
      query: { name: props.SysName, url: props.url, cid: props.id },
    }); //202210089030 测试
    let code = (await getchildcode(String(props.id), store.userid as string))
      .data;
    // 获取 子系统code 还有用户信息 传给子系统
    microApp.setData(props.SysName, {
      msg: code,
      userInformation: userInformation,
    });
  } else {
    router.push({ name: "Maintenance" });
  }
};
</script>

<style scoped>
.course {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  width: 400px;
  height: 150px;
}

.course h6 {
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.course h2 {
  letter-spacing: 1px;
  margin: 10px 0;
}

.course-preview {
  background-color: #2a265f;
  color: #fff;
  padding: 18px;
  width: 390px;
}

.course-preview a {
  color: #fff;
  display: inline-block;
  font-size: 12px;
  opacity: 0.6;
  margin-top: 30px;
  text-decoration: none;
}

.course-info {
  padding: 25px;
  position: relative;
  width: 100%;
}

.progress-container {
  position: absolute;
  top: 30px;
  right: 30px;
  text-align: right;
  width: 150px;
}

.progress {
  background-color: #ddd;
  border-radius: 3px;
  height: 5px;
  width: 100%;
}

.progress::after {
  border-radius: 3px;
  background-color: #2a265f;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 66%;
}

.progress-text {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 1px;
}

.btn {
  background-color: #2a265f;
  border: 0;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 12px 25px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  letter-spacing: 1px;
}

/* SOCIAL PANEL CSS */
.social-panel-container {
  position: fixed;
  right: 0;
  bottom: 80px;
  transform: translateX(100%);
  transition: transform 0.4s ease-in-out;
}

.social-panel-container.visible {
  transform: translateX(-10px);
}

.social-panel {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 16px 31px -17px rgba(0, 31, 97, 0.6);
  border: 5px solid #001f61;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Muli";
  position: relative;
  height: 169px;
  width: 370px;
  max-width: calc(100% - 10px);
}

.social-panel button.close-btn {
  border: 0;
  color: #97a5ce;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 5px;
  right: 5px;
}

.social-panel button.close-btn:focus {
  outline: none;
}

.social-panel p {
  background-color: #001f61;
  border-radius: 0 0 10px 10px;
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  padding: 2px 17px 6px;
  position: absolute;
  top: 0;
  left: 50%;
  margin: 0;
  transform: translateX(-50%);
  text-align: center;
  width: 235px;
}

.social-panel p i {
  margin: 0 5px;
}

.social-panel p a {
  color: #ff7500;
  text-decoration: none;
}

.social-panel h4 {
  margin: 20px 0;
  color: #97a5ce;
  font-family: "Muli";
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
}

.social-panel ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.social-panel ul li {
  margin: 0 10px;
}

.social-panel ul li a {
  border: 1px solid #dce1f2;
  border-radius: 50%;
  color: #001f61;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  text-decoration: none;
}

.social-panel ul li a:hover {
  border-color: #ff6a00;
  box-shadow: 0 9px 12px -9px #ff6a00;
}

.floating-btn {
  border-radius: 26.5px;
  background-color: #001f61;
  border: 1px solid #001f61;
  box-shadow: 0 16px 22px -17px #03153b;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  padding: 12px 20px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.floating-btn:hover {
  background-color: #ffffff;
  color: #001f61;
}

.floating-btn:focus {
  outline: none;
}

.floating-text {
  background-color: #001f61;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-family: "Muli";
  padding: 7px 15px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 998;
}

.floating-text a {
  color: #ff7500;
  text-decoration: none;
}

@media screen and (max-width: 480px) {
  .social-panel-container.visible {
    transform: translateX(0px);
  }

  .floating-btn {
    right: 10px;
  }
}
</style>
