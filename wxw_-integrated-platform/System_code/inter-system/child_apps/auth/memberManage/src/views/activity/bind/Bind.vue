<script setup lang="ts">
import { getRules } from '../../../api/methods/rules/rules';
import { useAppStore } from '../../../store';
import { useRequest } from "alova/client";
import { indicatorslist } from '../../../type/response-data';
import { delbindIndicator } from '../../../api/methods/activity/activity';
const store = useAppStore()
const isOpen=ref<boolean>(false)
const isDisabled = ref<boolean>(true)

const ruleLists = ref<indicatorslist[]>([]);

const { onSuccess:getActivitySuccess,send:update } = useRequest(() => getRules(store.activityId))
getActivitySuccess((res:any)=>{
  if(res.data.code == 200){
    ruleLists.value = res.data.data
    if(ruleLists.value.length === 0){
        isDisabled.value = false
    }else{
        isDisabled.value = true
    }
  }
})

const delbindActandScore = async(indicatorsId:number) => {
  const indicatorsIds=ref<number[]>([])
  indicatorsIds.value.push(indicatorsId)
  const res = await delbindIndicator(store.activityId,indicatorsIds.value)
  if (res.code === 200) {
    ElMessage({
      message: "解除成功！",
      type: "success",
    });
    update();
  } else {
    ElMessage({
      message: "解除失败！",
      type: "error",
    });
  }
}


const page = reactive<{
  currentPage: number;
  size: number;
  total: number;
}>({
  currentPage: 1,
  size: 10,
  total: 10,
});
//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  //total总页数实际值
  page.total = ruleLists.value.length;
  return ruleLists.value.filter(
    (_item: any, index: number) =>
      index < page.currentPage * page.size &&
      index >= page.size * (page.currentPage - 1)
  );
};
//改变页码
const handleCurrentChange = (e: number) => {
  page.currentPage = e;
};
//改变页数限制
const handleSizeChange = (e: number) => {
  page.size = e;
};
</script>
<template>
    <el-card style="width: 100%; height: 100%" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button  :disabled="isDisabled" @click="isOpen=true">添加绑定</el-button>
        </div>
      </template>
      <el-table
        :data="tableData()"
        style="width: 100%"
      >
        <el-table-column prop="indicatorsId" label="评分ID"/>
        <el-table-column prop="indicatorsName" label="评分名称"/>
        <el-table-column fixed="right" label="绑定操作" min-width="180">
          <template #default="scope">
            <el-popconfirm title="确定解除当前绑定?" @confirm="delbindActandScore(scope.row.indicatorsId)">
              <template #reference>
                 <el-button link type="danger" size="small">解除绑定</el-button>
              </template>
              <template #actions="{confirm, cancel }">
                <el-button size="small" @click="cancel">取消</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="confirm"
                >
                  确定
                </el-button>
              </template>
            </el-popconfirm>
          
          </template>
        </el-table-column>
      </el-table>
        <template #footer>
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="prev, pager, next, total"
          :total="page.total"
        />
      </template>
    </el-card>

    <indicators-dialog :open="isOpen" @close="isOpen=false" @complete="update()"></indicators-dialog>
</template>
<style scoped></style>