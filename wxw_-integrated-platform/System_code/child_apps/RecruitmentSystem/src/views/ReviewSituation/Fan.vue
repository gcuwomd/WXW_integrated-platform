<template>
  <div class="container mt-30px" style="display: flex; justify-content: center">
    <div ref="pie" style="display: flex; width: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { Pie } from "@antv/g2plot";
import { useRequest } from "alova";
import { onMounted, ref } from "vue";
import { getDepartmentData } from "../../api/methods/statistics";

const pie = ref();

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

const initChart = () => {
  const data = arr;
  const piePlot = new Pie(pie.value, {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.7,
    label: { style: { fontSize: 16 } },
    legend: {
      position: "top",
      marker: { style: { r: 10 } },
    },
    interactions: [{ type: "element-active" }],
  });
  piePlot.render();
};
</script>
