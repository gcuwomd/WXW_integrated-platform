<script lang="ts" setup>
import router from "../router/routers";

const BackToPrior = () => {
  router.back();
};
</script>

<template>
  <div class="bigbox">
    <img src="../assets/404.png" alt="" class="pag404" />
    <div class="container">
      <div class="row">
        <div
          class="col-md-6 align-self-center"
          style="margin: 45px; padding: 50px 0 0 0"
        >
          <p class="errorTitle">找不到页面</p>
          <p>你要找的页面暂时找不到，可以点击返回键回到上一页</p>
          <p class="errorTitle">UH OH! You're lost.</p>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <button class="btn green" @click="BackToPrior">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --blue: #0e0620;
  --white: #fff;
  --green: #4b70e2;
}

/* html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nunito Sans";
  color: var(--blue);
  font-size: 1em;
} */

button {
  font-family: "Nunito Sans";
}
a {
  text-decoration: none;
}

.btn {
  z-index: 1;
  overflow: hidden;
  background: transparent;
  position: relative;
  padding: 8px 50px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  letter-spacing: 2px;
  transition: 0.2s ease;
  font-weight: bold;
  margin: 5px 0px;
}
.btn.green {
  border: 4px solid var(--green);
  color: var(--blue);
}
.btn.green:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0%;
  height: 100%;
  background: var(--green);
  z-index: -1;
  transition: 0.2s ease;
}
.btn.green:hover {
  color: var(--white);
  background: var(--green);
  transition: 0.2s ease;
}
.btn.green:hover:before {
  width: 100%;
}
.bigbox {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.pag404 {
  margin: 50px;
  height: 700px;
}

.errorTitle {
  font-weight: bold;
  color: #7195ea;
  font-size: 35px;
}

p {
  font-size: 20px;
  color: #5e5e5e;
}
</style>
