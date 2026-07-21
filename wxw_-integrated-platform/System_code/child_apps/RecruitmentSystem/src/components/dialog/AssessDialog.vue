<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { subNext } from "../../api/methods/submitNext";
import { assess } from "../../api/methods/assess";
import { FormInstance, FormRules } from "element-plus";
import { ElMessage as elmessage } from "element-plus";
import { useRequest } from "alova"; //aolva 引入
interface DialogProps {
  id: string;
  open: boolean;
  title: string;
}
interface formData {
  id: string;
  comment: string;
}

const props = defineProps<DialogProps>();
const emit = defineEmits<{
  close: [];
  complete: [];
}>();

const formRef = ref<FormInstance>();
const form = reactive<formData>({ id: "", comment: "" });

const rules = reactive<FormRules>({
  comment: [{ required: true, message: "请输入评价", trigger: "blur" }],
});
watch(props, (newValue) => {
  form.id = newValue.id;
});
const open = ref<boolean>(false);
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen;
  }
);

const closeDialog = () => {
  formRef?.value?.resetFields();
  emit("close");
};

//提交到下一部门
const { onSuccess: submitSuccess, send: updatesubmit } = useRequest(
  (id: string) => subNext(id), //学号id
  {
    immediate: false,
  }
);
submitSuccess(async (response) => {
  if (response.data.code === 200) {
    emit("complete");
    elmessage.success("提交成功");
    closeDialog();
    elmessage.success("成功");
  } else {
    elmessage.error("你的部门为第二志愿，无下个部门");
  }
});
// assess 记录评价信息
const { onSuccess: assessSuccess, send: updateassess } = useRequest(
  (form: formData) => assess(form), //学号id
  {
    immediate: false,
  }
);
assessSuccess(async (response) => {
  if (response.data.code === 200) {
    elmessage.success("成功");
    await updatesubmit(form.id);
  } else {
    elmessage.error("你的部门为第二志愿部门，无下个部门");
  }
});

const submitForm = () => {
  formRef?.value?.validate(async (valid, _fields) => {
    if (valid) {
      updateassess(form);
    }
  });
};
</script>
<template>
  <el-dialog
    v-model="open"
    :title="props.title"
    :append-to-body="true"
    width="512"
    @close="closeDialog"
  >
    <el-form :rules="rules" :model="form" ref="formRef">
      <el-form-item label="请输入评价信息" prop="comment">
        <el-input v-model="form.comment" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm"> 提交给下个部门 </el-button>
    </template>
  </el-dialog>
</template>
<style scoped></style>
