<template>
  <el-form
    ref="forms"
    :model="form"
    :rules="rules"
    scroll-to-error="true"
    label-position="top"
  >
    <el-form-item label="学号" prop="id">
      <el-input v-model="form.id" placeholder="请输入学号" clearable></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入姓名"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="学院" prop="college">
      <el-select v-model="form.college" placeholder="请选择学院" filterable>
        <el-option
          v-for="option in collegeOption"
          :Key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="专业" prop="major">
      <el-input
        v-model="form.major"
        placeholder="请输入专业"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="第一意向部门" prop="firstIntention">
      <el-select v-model="form.firstIntention" placeholder="请选择第一意向部门">
        <el-option
          v-for="option in firstSectionOption"
          :Key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.value == form.secondIntention"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="第二意向部门" prop="secondIntention">
      <el-select
        v-model="form.secondIntention"
        placeholder="请选择第二意向部门"
      >
        <el-option
          v-for="option in secondSectionOption"
          :Key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.value == form.firstIntention"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="联系电话" prop="phone">
      <el-input
        v-model="form.phone"
        placeholder="请输入联系电话"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="自我介绍" prop="introduction">
      <el-input
        type="textarea"
        v-model="form.introduction"
        :autosize="{ minRows: 3, maxRows: 100 }"
        minlength="10"
        maxlength="255"
        show-word-limit
        placeholder="用不少于10个字符的一段话介绍一下自己吧~"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="上传你的照片可以加深我们对你的印象哦~"
      :show-label="false"
    >
      <el-space vertical>
        <el-upload
          ref="upload"
          action="http://10.1.32.242:6604/putPhoto"
          :data="uploadData"
          multiple
          v-model:file-list="fileList"
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          accept=".jpeg,.png,.jpg,.bmp,.gif"
          :max="1"
          :before-upload="beforeUpload"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-space>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 90%" @click="onSubmit(forms)" type="primary"
        >提交</el-button
      >
    </el-form-item>
    <!-- <el-button
        style="width: 10%"
        type="primary"
        >重置</el-button
      > -->
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { IApply } from "../types/index";
import { collegeOptions, sectionOptions } from "../assets/ts/options";
import { rules } from "../assets/ts/rules";
import { baseAxios } from "../const";
import { Plus } from "@element-plus/icons-vue";
import type {
  FormInstance,
  UploadInstance,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import { acquire } from "../assets/ts/acquire";

const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const forms = ref<FormInstance>();
const upload = ref<UploadInstance>();
const route = useRouter();
const form = reactive<IApply>({
  id: null,
  username: null,
  gender: null,
  college: null,
  major: null,
  firstIntention: null,
  secondIntention: null,
  phone: null,
  introduction: null,
});
const collegeOption = reactive(collegeOptions);
const firstSectionOption = reactive(sectionOptions);
const secondSectionOption = reactive(sectionOptions);

//加载过的页面信息
const load = async () => {
  const data = (await acquire()).data.data;
  form.username = data.username;
  form.id = data.id;
  form.introduction = data.introduction;
  form.major = data.major;
  form.college = data.college;
  form.phone = data.phone;
  form.gender = data.gender;
  form.firstIntention = data.volunteer[0].departmentName;
  form.secondIntention = data.volunteer[1].departmentName;
  console.log(form.firstIntention);
};
//加载页面时，组件挂载完成后执行
onMounted(async () => {
  await load();
});
// 上传时除file外的额外参数
const uploadData = ref({
  id: form.id,
});
// 监听“form”上的更改，发生更改时用新值更新“uploadData.value”对象的“id”属性
watch(form, (newValue) => {
  uploadData.value.id = newValue.id;
});
//点击删除按钮
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
// 点击加号上传文件
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any) => {
    if (valid) {
      // 校验成功
      const volunteer = [
        {
          level: "1",
          departmentId: form.firstIntention,
        },
        {
          level: "2",
          departmentId: form.secondIntention,
        },
      ];
      const formdata = {
        id: form.id,
        username: form.username,
        introduction: form.introduction,
        major: form.major,
        college: form.college,
        phone: form.phone,
        gender: form.gender,
        volunteer: volunteer,
      };
      baseAxios.post("/user/register", formdata).then((res) => {
        ElMessage({
          message: "报名成功！",
          type: "success",
        });
        if (res.data.code === 200) {
          route.push("/welcome");
        }
      });
      upload.value!.submit();
    } else {
      ElMessage.error("报名失败！");
    }
  });
};
//压缩上传图片
import imageConversion from "image-conversion";
const beforeUpload = async (file: any) => {
  return new Promise((resolve) => {
    let isLt2M = file.size / 1024 / 1024 < 2; // 判定图片大小是否小于2MB
    if (isLt2M) {
      resolve(file);
    }
    console.log("file", file); // 压缩到400KB,这里的400就是要压缩的大小,可自定义
    imageConversion.compressAccurately(file, 1024 * 3).then((res) => {
      console.log("res", res);
      resolve(res);
    });
  });
};
</script>

<style>
.el-input,
.el-select {
  width: 100%;
}
</style>
