<script setup lang="ts">
import router from "../router";
import { type TableColumnCtx } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";
import { EvaluateInfos } from "../type/response-data";
import { submitScore } from "../type/request-data";
import { getActEvalute, submitEvalute } from "../api/methods/evaluate/evaluate";
import { useRequest } from "alova/client";
import { useAppStore } from "../store";

interface SpanMethodProps {
  row: EvaluateInfos;
  column: TableColumnCtx<EvaluateInfos>;
  rowIndex: number;
  columnIndex: number;
}
interface SummaryMethodProps<T = any> {
  columns: TableColumnCtx<T>[];
  data: T[];
}
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.query.userId;
const store = useAppStore();

let performance = reactive<submitScore>({
  userId: Number(id),
  totalScore: null,
  others: null,
  activityId: store.activityId,
});

//获取当前人员所有评分细则
const tableData = ref<EvaluateInfos[]>([
  // {
  //   indicators: "测试1",
  //   element: "测试1",
  //   content: "测试1",
  //   standardScore: 0,
  //   score: null,
  // },
  // {
  //   indicators: "测试1",
  //   element: "测试内容",
  //   content: "测试内容1",
  //   standardScore: 0,
  //   score: null,
  // },
  // {
  //   indicators: "测试1",
  //   element: "测试内容",
  //   content: "测试内容2",
  //   standardScore: 0,
  //   score: null,
  // },
]);
const { onSuccess: getActEvaluateSuccess } = useRequest(() =>
  getActEvalute(store.activityId)
);
getActEvaluateSuccess((response) => {
  if (response.data.code == 200) {
    //获取活动细则
    //@ts-ignore
    response.data.data.forEach((item: any) => {
      let indicatorsName = item.indicatorsName;
      item.elements.forEach((ele: any) => {
        tableData.value.push({
          indicators: indicatorsName,
          element: ele.elementsName,
          content: ele.content,
          standardScore: ele.standardScore,
          score: null,
        });
      });
    });
  }
});

// 合并同行，需要优化

const objectSpanMethod = ({
  row,

  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  // ----要合并哪一行根据实际业务来定，可以写死
  if (columnIndex == 0) {
    // 获取当前单元格的值
    const currentValue = row["indicators"];
    // 上一行单元格的值
    // 获取上一行相同列的值
    const preRow = tableData.value[rowIndex - 1];
    const preValue = preRow ? preRow["indicators"] : null;
    if (currentValue === preValue) {
      return { rowspan: 0, colspan: 0 };
    } else {
      // 否则计算当前单元格应该跨越多少行
      let rowspan = 1;
      for (let i = rowIndex + 1; i < tableData.value.length; i++) {
        const nextRow = tableData.value[i];
        const nextValue = nextRow["indicators"];
        if (nextValue === currentValue) {
          rowspan++;
        } else {
          break;
        }
      }
      return { rowspan, colspan: 1 };
    }
  }
  if (columnIndex == 1) {
    // 获取当前单元格的值
    const currentValue = row["element"];
    // 上一行单元格的值
    // 获取上一行相同列的值
    const preRow = tableData.value[rowIndex - 1];
    const preValue = preRow ? preRow["element"] : null;
    if (currentValue === preValue) {
      return { rowspan: 0, colspan: 0 };
    } else {
      // 否则计算当前单元格应该跨越多少行
      let rowspan = 1;
      for (let i = rowIndex + 1; i < tableData.value.length; i++) {
        const nextRow = tableData.value[i];
        const nextValue = nextRow["element"];
        if (nextValue === currentValue) {
          rowspan++;
        } else {
          break;
        }
      }
      return { rowspan, colspan: 1 };
    }
  }
};

//从表格中拿取合计评价分数
const getTotalScore = (sums: number) => {
  performance.totalScore = sums;
};
//求类型为number的元素总计,但返回值为string
const getSummary = (param: SummaryMethodProps) => {
  // 列表数据
  const { columns, data } = param;
  // 定义新的数组接收
  const sums: any[] = [];
  columns.forEach((column, index) => {
    // 定义第一列的底部文字
    if (index === 0) {
      sums[index] = "合计分数";
      return;
    }
    // 循环列表数据得到我们的各个行与列的数据
    const values = data.map((item) => Number(item[column.property]));
    // 通过prop找到你需要计算的列。
    if (column.property === "score" || column.property === "standardScore") {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
      sums[index];
      // 定义一个值接收得到的总计的数值
      const contaddsum = sums[index];
      getTotalScore(contaddsum);
    } else {
      sums[index] = "--";
    }
  });
  // 得到返回值
  return sums;
};
//评价分数
const inputVerification = (row: EvaluateInfos) => {
  if (row.score) {
    if (row.score >= row.standardScore) {
      ElNotification({
        title: "注意",
        message: "已达到或超出标准分数",
        type: "warning",
      });
    }
  }
};

const submit = async () => {
  if (performance.totalScore) {
    const res = await submitEvalute(performance);
    if (res.code === 200) {
      ElMessage({
        message: "评价成功！",
        type: "success",
      });
    } else {
      ElMessage({
        message: "评价失败！",
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: "请填写评价分数！",
      type: "error",
    });
  }
};
</script>
<template>
  <el-card class="content-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-button
          @click="
            router.push({
              path: '/activity/ActivityDetails/Assessment',
              query: {
                activityName: store.activityName,
                activityId: store.activityId,
              },
            })
          "
          :icon="ArrowLeft"
          >返回</el-button
        >
        <el-text style="margin-left: 20px" size="large">
          参与活动名称：{{ store.activityName }}
        </el-text>
      </div>
    </template>
    <div class="card-body">
      <el-table
        :data="tableData"
        style="width: 100%"
        show-summary
        :summary-method="getSummary"
        :span-method="objectSpanMethod"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="indicators" label="评价指标" />
        <el-table-column prop="element" label="评价要素" />
        <el-table-column prop="content" label="具体描述" />
        <el-table-column label="分数">
          <el-table-column prop="standardScore" label="标准分数" />
          <el-table-column prop="score" label="评价分数">
            <template #default="scope">
              <el-input-number
                placeholder="分数"
                v-model="scope.row.score"
                :min="0"
                :max="scope.row.standardScore"
                @input="inputVerification(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <table width="100%" height="100">
        <tbody>
          <tr>
            <td class="text">其他评价</td>
            <td>
              <el-input
                v-model="performance.others"
                :autosize="{ minRows: 4, maxRows: 2 }"
                type="textarea"
                placeholder="请输入(可选)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <el-button class="btn" type="primary" @click="submit"> 提交 </el-button>
    </template>
  </el-card>
</template>
<style scoped>
.content-card {
  min-width: 1028px;
  width: 100%;
  height: 100%;
  border: none;
}
.el-input-number {
  width: 100%;
}
table,
td {
  border: 1px solid #dfe6edfe;
  border-spacing: 0; /*去掉单元格间隙*/
}
.text {
  background-color: #f5f7fa;
  text-align: center;
  font-size: 14px;
}
.el-textarea,
.el-textarea__inner {
  height: 100% !important;
}
.btn {
  margin-top: 20px;
  width: 100px;
  height: 40px;
}
/* 表格文字居中 */
::v-deep .el-table td.el-table__cell div {
  text-align: center;
}
</style>
