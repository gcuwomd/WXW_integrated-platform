<template>
  <div
    class="container"
    style="
      display: flex;
      justify-content: center;
      height: 400px;
      margin-top: 80px;
    "
  >
    <div ref="hiss"></div>
  </div>
</template>

<script lang="ts" setup>
import { Column } from "@antv/g2plot";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRequest } from "alova";
// import { getDepartmentId } from "../../../api/methods/recruitment/getDepartmentID";
import { getDepartmentData } from "../../api/methods/statistics";

const hiss = ref();
interface Department {
  type: string;
  value: number;
}

let arr: Department[] = [];

onMounted(async () => {
  try {
    // 获取 departmentId

    // 使用 departmentId 获取部门数据
    const { data: departmentData } = await useRequest(() =>
      getDepartmentData()
    ).send();
    arr = departmentData.department;
    // 初始化图表
    initChart();
  } catch (error) {
    console.error(error);
  }
});

let initChart = () => {
  let data = arr;
  const Hisplot = new Column(hiss.value, {
    width: 500,
    data,
    padding: "auto",
    xField: "type",
    yField: "value",
    color: ["#6294fa", "#63daab", "#657798", "#f7c122"],
    seriesField: "type",
    legend: { position: "top" },
    meta: {
      type: {
        alias: "部门",
      },
      value: {
        alias: "人数",
      },
    },
  });
  Hisplot.render();
};
</script>
