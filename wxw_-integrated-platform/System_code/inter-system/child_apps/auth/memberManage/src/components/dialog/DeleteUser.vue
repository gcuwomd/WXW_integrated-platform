<script setup lang="ts">
import { WarningFilled } from "@element-plus/icons-vue";
interface isDelDialog {
  open: boolean;
}

const props = defineProps<isDelDialog>();
const emit = defineEmits<{
  close: [];
  complete: [];
}>();

// 控制 dialog 打开和关闭
const dialogVisible = ref<boolean>(false);
watch(
  () => props.open,
  (isOpen: boolean) => {
    dialogVisible.value = isOpen;
  }
);

const closeDialog = () => {
  emit("close");
};
</script>
<template>
  <el-dialog 
    v-model="dialogVisible"
    title="提示"
    width="350" 
    align-center
    @close="closeDialog"
    >
    <div class="space">
      <el-icon color="#e6a23c" :size="22"><WarningFilled /></el-icon>
      <span style="font-size: 1rem"> 此操作将删除该成员信息，是否继续？ </span>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeDialog"> 确认 </el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
.space{
    display: flex;
    justify-content: space-around;
}

</style>
