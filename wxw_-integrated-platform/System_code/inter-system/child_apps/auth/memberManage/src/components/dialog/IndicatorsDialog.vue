<script setup lang="ts">
import { getRules } from '../../api/methods/rules/rules';
import { useAppStore } from '../../store';
import { useRequest } from "alova/client";
import { indicatorslist } from '../../type/response-data';
import { bindIndicator } from '../../api/methods/activity/activity';

interface DialogProps {
  open: boolean;
}
const props = defineProps<DialogProps>();
const emit = defineEmits<{
  close: [];
  complete: [];
}>();

// 控制 dialog 打开和关闭
const open = ref<boolean>(false);
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen;
  }
);

const closeDialog = () => {
  emit("close");
};

const store = useAppStore()

const ruleLists = ref<indicatorslist[]>([]);

  const { onSuccess:getActivitySuccess } = useRequest(() => getRules(0))
  getActivitySuccess((res)=>{
    if(res.data.code == 200){
      ruleLists.value = res.data.data
    }
  })

const message = ref<string>('')
const bindActandScore = async(indicatorsId:number) => {
  const indicatorsIds=ref<number[]>([])
  indicatorsIds.value.push(indicatorsId)
  const res = await bindIndicator(store.activityId,indicatorsIds.value)
  if (res.code === 200) {
    message.value = res.msg as string
    ElMessage({
      message: "绑定成功！",
      type: "success",
    });
    emit('complete')
  } else {
    ElMessage({
      message: "绑定失败！",
      type: "error",
    });
  }
  emit('close')
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
    <el-dialog 
    v-model="open"
    
    @close="closeDialog"
    >
    <el-table
        :data="tableData()"
        style="width: 100%"
      >
        <el-table-column prop="indicatorsId" label="评分ID"/>
        <el-table-column prop="indicatorsName" label="评分名称"/>
        <el-table-column fixed="right" label="绑定操作" min-width="180">
          <template #default="scope">
            <el-popconfirm title="确定绑定当前细则?" @confirm="bindActandScore(scope.row.indicatorsId)">
              <template #reference>
                 <el-button link type="primary" size="small">绑定活动</el-button>
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
    </el-dialog>
</template>
<style scoped></style>