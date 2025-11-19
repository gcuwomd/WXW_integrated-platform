<script setup lang="ts">
import { FormInstance } from "element-plus";
import type { CheckboxValueType } from "element-plus";
import {
  addActivity,
  addYear,
  getYear,
} from "../../api/methods/activity/activity";

interface DialogProps {
  open: boolean;
  formData?: {
    activityName: string;
    description: string;
  };
}
const props = defineProps<DialogProps>();
// 控制 dialog 打开和关闭
const open = ref<boolean>(false);
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen;
  }
);

const emit = defineEmits<{
  close: [];
  complete: [];
}>();

const closeDialog = () => {
  emit("close");
};

// const isAdding = ref(false);
const yearValue = ref<CheckboxValueType[]>([]);
// const optionName = ref("");
const years = ref<any[]>([
  {
    value: "2024",
    label: "2024学年",
  },
]);

//合并同类
const fcGetYear = async () => {
  await getYear().then((res) => {
    res.data.forEach((item) => {
      const newArr = [
        {
          value: item.slice(0, 4),
          label: item,
        },
      ];
      const arr = [...years.value, ...newArr];
      const map = new Map();
      years.value = arr.filter((item) => {
        return !map.has(item.value) && map.set(item.value, 1);
      });
    });
  });
};

onMounted(() => {
  //获取细则列表
  fcGetYear();
});

// const onAddOption = () => {
//   isAdding.value = true;
// };
/*
const onConfirm = async () => {
  if (optionName.value) {
    years.value.push({
      value: optionName.value.slice(0, 4),
      label: optionName.value,
    });
    await addYear(optionName.value.slice(0, 4)).then((res) => {
      if (res.code === 200) {
        console.log("添加成功");
        fcGetYear();
        clear();
      } else {
        console.log("添加失败");
        clear();
      }
    });
    clear();
  }
}; */

// const clear = () => {
//   optionName.value = "";
// isAdding.value = false;
// };

const formRef = ref<FormInstance>();
const form = reactive({
  activityName: props.formData?.activityName,
  description: props.formData?.description,
  year: yearValue.value.slice(0, 4),
});

const submitForm = async () => {
  const res = await addActivity(form);
  if (res.code === 200) {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    emit("complete");
  } else {
    ElMessage({
      message: "添加失败",
      type: "error",
    });
    emit("close");
  }
};
const addyear = async () => {
  await addYear().then(async (res) => {
    if (res.code === 200) {
      ElMessage({
        message: "添加成功",
        type: "success",
      });
      await fcGetYear();
    } else if (res.msg === "不要再建了，建那么多年你选的过来吗") {
      ElMessage({
        message: res.msg,
        type: "warning",
      });
    } else {
      ElMessage({
        message: "添加失败",
        type: "error",
      });
    }
  });
};
</script>
<template>
  <el-dialog
    v-model="open"
    :show-close="false"
    width="512"
    class="!rounded-lg"
    @close="closeDialog"
  >
    <el-form ref="formRef" style="max-width: 600px" label-position="top">
      <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="form.activityName" />
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="活动学年">
        <el-select
          v-model="form.year"
          placeholder="选择学年"
          style="width: 240px"
        >
          <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <template #footer>
            <el-button text bg size="small" @click="addyear">
              添加学年
            </el-button>
            <!-- <template v-else>
              <el-input
                v-model="optionName"
                class="option-input"
                placeholder="请输入学年"
                size="small"
              />
              <el-button type="primary" size="small" @click="onConfirm">
                确认
              </el-button>
              <el-button size="small" @click="clear">取消</el-button>
            </template> -->
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer style="border-top: 1px black solid">
      <el-button @click="submitForm" type="primary">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>
<style scoped>
.option-input {
  margin: 2px;
}
</style>
