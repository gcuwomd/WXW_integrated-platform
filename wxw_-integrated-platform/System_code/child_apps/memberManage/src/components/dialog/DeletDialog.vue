<!-- 删除对话框 -->
<script setup lang="ts">
interface DialogProps {
  visible: boolean;
  title: string;
  apiMethod: Function;
  id: number | undefined;
}

const props = defineProps<DialogProps>();
const emit = defineEmits<{
  close: [];
  complete: [];
}>();

// 控制 dialog 打开和关闭
const dialogVisible = ref<boolean>(false);
watch(
  () => props.visible,
  (isOpen: boolean) => {
    dialogVisible.value = isOpen;
  }
);

// 关闭对话框
const closeDialog = () => {
  emit("close");
};

// 提交表单
const handleSubmit = async () => {
  try {
    await props.apiMethod(props.id);
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    emit("complete");
    closeDialog();
  } catch (error) {
    console.error("提交失败:", error);
  }
};
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    @close="closeDialog"
    class="space"
    style="max-width: 600px; width: 35%"
  >
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确认</el-button>
      <el-button @click="closeDialog">取消</el-button></span
    >
  </el-dialog>
</template>
<style scoped>
.space {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
