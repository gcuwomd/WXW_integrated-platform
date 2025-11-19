<!-- 添加或修改对话框 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    @close="close"
    class="space"
    style="max-width: 600px; width: 35%"
  >
    <div style="width: 100%">
      <el-form
        @submit.prevent="handleSubmit"
        style="width: 100%"
        :model="fields"
      >
        <template v-for="field in fields">
          <el-form-item
            :label="field.label"
            label-position="top"
            v-if="field.label === '状态'"
          >
            <el-select
              v-model="formData[field.model]"
              :placeholder="field.placeholder"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item :label="field.label" label-position="top" v-else>
            <el-input
              v-model="formData[field.model]"
              :placeholder="field.placeholder"
              style="width: 100%"
              class="m-5px"
            >
            </el-input>
          </el-form-item>
        </template>
        <span slot="footer"
          ><el-button type="primary" @click="handleSubmit">{{
            button
          }}</el-button>
          <el-button @click="close">取消</el-button>
        </span>
      </el-form>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
interface DialogProps {
  visible: boolean;
  title: string;
  apiMethod: Function;
  fields: Array<Field>;
  initialData: Record<string, any>;
  row?: any; //修改时需要
}
interface Field {
  model: string;
  placeholder: string;
  label: string;
}
const props = defineProps<DialogProps>();
const emit = defineEmits<{
  close: [];
  complete: [];
}>();

const button = ref<string>("");

const formData = ref({ ...props.initialData });

// 提交表单
const handleSubmit = async () => {
  try {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    await props.apiMethod(formData.value);
    emit("complete");
  } catch (error) {
    console.error("提交失败:", error);
  }
};

// 关闭对话框
const close = () => {
  emit("close");
  // formData.value = {}; // Reset form data
};

// 监控初始数据变化
watch(
  () => props.initialData,
  (newVal) => {
    formData.value = { ...newVal };
  },
  { immediate: true }
);

// 控制 dialog 打开和关闭
const dialogVisible = ref<boolean>(false);
watch(
  () => props.visible,
  (isOpen: boolean) => {
    dialogVisible.value = isOpen;
    if (props.title.includes("添加")) {
      button.value = "添加";
    } else {
      button.value = "修改";
    }
  }
);
</script>

<style scoped>
.space {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
