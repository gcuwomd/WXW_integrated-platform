<template>
  <div class="welcome">
    <div
      class="i-twemoji:slightly-smiling-face text-gray-600 text-8xl mx-auto"
    ></div>
    <span class="text-gradient">网信委大家庭期待你的加入</span>
    <el-link
      :underline="false"
      href=""
      type="succes"
      @click="
        () => {
          $router.push('/');
        }
      "
      >重新报名</el-link
    >
  </div>
</template>
<style scoped>
.text-gradient {
  background-image: linear-gradient(
    to right,
    #ff6f91,
    #ff717d,
    #ff7767,
    #ff8051,
    #ff8b3a,
    #ff873c,
    #ff823f,
    #ff7e41,
    #ff6a5e,
    #ff5d7c,
    #f05998,
    #d65db1
  );
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.7em;
}
.welcome {
  width: 100%;
  height: 100%;
  position: relative;
  top: 130px;
}
.welcome span,
.el-link {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 15px;
}
</style>
