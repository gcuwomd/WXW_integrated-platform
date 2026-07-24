<template>
  <div class="container mt-30px" style="display: flex; justify-content: center">
    <div ref="pie" style="display: flex; width: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { Pie } from "@antv/g2plot";
import { useRequest } from "alova";
import { onMounted, ref } from "vue";
import { admin } from "../../api/methods/admin";
import { getDeptName } from "../../utils/constants";

const pie = ref();

interface Department {
  type: string;
  value: number;
}

let arr: Department[] = [];

onMounted(async () => {
  try {
    // 使用 /user/info/all 获取所有用户数据，先获取第一页拿到 total
    const { data: firstPage } = await useRequest(() =>
      admin(1, 100)
    ).send();
    let users: any[] = [...(firstPage.data || [])];
    const total = firstPage.total;

    // 如果总数超过一页，继续获取剩余数据
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

    // 按 volunteer["1"] 聚合部门人数（支持JSON字符串、数组和对象三种格式，ID自动转名称）
    const deptCountMap: Record<string, number> = {};
    users.forEach((user: any) => {
      let firstDept = '未知';
      let vol = user.volunteer;
      if (vol) {
        // 如果是JSON字符串，先解析
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

    // 转换为图表数据格式
    arr = Object.entries(deptCountMap).map(([type, value]) => ({
      type,
      value,
    }));

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
