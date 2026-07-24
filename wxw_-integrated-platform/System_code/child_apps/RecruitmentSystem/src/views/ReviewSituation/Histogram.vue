<template>
  <div class="container" style="display: flex; justify-content: center; padding: 20px">
    <div ref="chartRef" style="width: 700px; height: 400px"></div>
  </div>
</template>

<script lang="ts" setup>
import { Column } from "@antv/g2plot";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRequest } from "alova";
import { admin } from "../../api/methods/admin";
import { getDeptName } from "../../utils/constants";

interface Department {
  type: string;
  value: number;
}

const chartRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  try {
    const { data: firstPage } = await useRequest(() =>
      admin(1, 100)
    ).send();
    let users: any[] = [...(firstPage.data || [])];
    const total = firstPage.total;

    if (total > users.length) {
      const totalPages = Math.ceil(total / 100);
      const remainingRequests = [];
      for (let page = 2; page <= totalPages; page++) {
        remainingRequests.push(useRequest(() => admin(page, 100)).send());
      }
      const remainingResults = await Promise.all(remainingRequests);
      remainingResults.forEach((res: any) => {
        users = users.concat(res.data.data || []);
      });
    }

    // 只统计第一志愿的分布
    const deptCountMap: Record<string, number> = {};
    users.forEach((user: any) => {
      let firstDept = '未知';
      let vol = user.volunteer;
      if (vol) {
        if (typeof vol === 'string') {
          try { vol = JSON.parse(vol); } catch { /* keep as string */ }
        }
        if (Array.isArray(vol)) {
          const item = vol.find((v: any) => String(v.level) === '1');
          firstDept = item?.departmentId ? getDeptName(item.departmentId) : '未知';
        } else if (typeof vol === 'object') {
          firstDept = vol['1'] ? getDeptName(vol['1']) : '未知';
        }
      }
      deptCountMap[firstDept] = (deptCountMap[firstDept] || 0) + 1;
    });

    const data: Department[] = Object.entries(deptCountMap).map(
      ([type, value]) => ({ type, value })
    );

    if (chartRef.value && data.length > 0) {
      initChart(chartRef.value, data);
    }
  } catch (error) {
    console.error(error);
  }
});

let initChart = (container: HTMLElement, data: Department[]) => {
  const Hisplot = new Column(container, {
    width: 700,
    data,
    padding: "auto",
    xField: "type",
    yField: "value",
    color: "#6294fa",
    label: {
      position: "top",
      style: {
        fill: "#333",
        fontSize: 14,
      },
    },
    xAxis: {
      label: {
        style: {
          fill: "#333",
          fontSize: 12,
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: "#333",
          fontSize: 12,
        },
      },
    },
    meta: {
      type: {
        alias: "第一志愿部门",
      },
      value: {
        alias: "人数",
      },
    },
  });
  Hisplot.render();
};
</script>
