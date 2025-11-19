//部门选择卡片
<template>
  <div class="card">
    <div class="card-details">
      <img :src="props.Dimg" alt="" class="w-100%" />
      <p class="text-title">{{ props.DepartmentName }}</p>
      <!-- <p class="text-body">{{ props.Descirption }}</p> -->
    </div>
    <button class="card-button" @click="chosedepartment()">Chose Me</button>
  </div>
  <!-- <div class="box m-30px">
    <span></span>
    <div class="content">
      <h2>{{ props.DepartmentName }}</h2>
    </div>
  </div> -->
</template>

<script setup lang="ts">
// import { ref } from "vue";

interface DepartmentCard {
  DepartmentName: String;
  Descirption: String;
  Dimg: string;
}
const props = defineProps<DepartmentCard>();
const emit = defineEmits<{
  chose: [];
}>();
const chosedepartment = () => {
  emit("chose");
};
</script>

<style scoped>
/* From Uiverse.io by alexruix */
.card {
  margin: 25px;
  width: 170px;
  height: 220px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 0px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
}

.card-details {
  color: rgb(84, 161, 142);
  height: 100%;
  gap: 0.5em;
  display: grid;
  /* place-content: center; */
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(134, 134, 134);
}

/*Text*/
.text-title {
  font-size: 1.5em;
  font-weight: bold;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
/* From Uiverse.io by Codewithvinay */
.box {
  position: relative;
  width: 220px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  z-index: 1;
}

.box::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  text-decoration: none;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}

.box::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
  filter: blur(30px);
}

.box:hover:before,
.box:hover:after {
  transform: skewX(0deg) scaleX(1.3);
}

.box:before,
.box:after {
  background: linear-gradient(315deg, #f0d27e, #72f9eb);
}

.box span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.box span::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.1s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.box span::before {
  top: -40px;
  left: 40px;
  width: 50px;
  height: 50px;
  opacity: 1;
}

.box span::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.5s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation-delay: -1s;
}

.box span:after {
  bottom: -40px;
  right: 40px;
  width: 50px;
  height: 50px;
  opacity: 1;
}

.box .content {
  position: relative;
  width: 190px;
  height: 254px;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transform: 0.5s;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box .content h2 {
  font-size: 22px;
  color: #fff;
  margin-bottom: 10px;
}
</style>
