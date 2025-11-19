<template>
  <div
    class="w-screen h-screen bg-white text-black bg-contianer flex flex-col justify-center items-center relative"
  >
    <!-- #353e54 -->
    <div class="container">
      <h1 style="margin-top: 30px; margin-bottom: 40px">{{ title }}</h1>
    </div>
    <div class="flex justify-center">
      <Dcards
        :DepartmentName="item.dename"
        :Descirption="item.ds"
        :Dimg="item.dimg"
        v-for="(item, index) in arry"
        :key="item.dename"
        @click="chose(item.id)"
        @mouseover="handleMouseOver(index)"
        @mouseleave="handleMouseLeave"
        :class="{ 'opacity-30': hoverIndex !== null && hoverIndex !== index }"
      />
    </div>
    <div
      class="form__group field"
      style="position: absolute; right: 50px; top: 20px"
    >
      <input
        placeholder="Name"
        class="form__field"
        type="input"
        v-model="suppleInformation.username"
      />
      <label class="form__label" for="name">Username</label>
    </div>
  </div>
  <el-dialog v-model="DialogVisible" title="注意" width="500" center>
    <span> 是否确认选择该部门？ </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="DialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            {
              DialogVisible = false;
              suppleInfor();
            }
          "
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import Dcards from "../components/Dcards.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const hoverIndex = ref<number | null>(null);
import { supplementInformation } from "../api/methods/userInformation";
import { supple } from "../type/respon-data";
import { useStore } from "../store/user";
import { debouncedShowMessage } from "../../src/utils/debounce.ts";
const DialogVisible = ref(false);

// 部门信息
interface arrys {
  dename: string;
  ds: string;
  dimg: string;
  id: number;
}

let arry = ref<arrys[]>([
  {
    dename: "网站运维部",
    ds: "网站运维部",
    dimg: "/images/wz.png",
    id: 2,
  },
  {
    dename: "信息化运维部",
    ds: "信息化运维部",
    dimg: "/images/xxh.png",
    id: 1,
  },
  {
    dename: "网络运维部",
    ds: "网络运维部",
    dimg: "/images/wl.png",
    id: 3,
  },
  {
    dename: "行政秘书部",
    ds: "行政秘书部",
    dimg: "/images/xm.png",
    id: 4,
  },
]);

// 直接使用文本，不需要逐字显示
const title = "选择你的部门";

// 鼠标悬停事件处理
const handleMouseOver = (index: number) => {
  hoverIndex.value = index;
};

// 鼠标离开事件处理
const handleMouseLeave = () => {
  hoverIndex.value = null;
};

//信息补充完整 要 更新token
const suppleInformation = ref<supple>({
  departmentId: null,
  username: "",
});
const chose = (id: number) => {
  suppleInformation.value.departmentId = id;
  DialogVisible.value = true;
};

const suppleInfor = async () => {
  const store = useStore();

  //点选我就是请求 请求成功则跳转
  if (suppleInformation.value.username != "") {
    let data = await supplementInformation(suppleInformation.value);

    if (data.code == 200) {
      store.token = data.data; // 存储一份 补充完信息 要更新
      debouncedShowMessage(data.msg, "success");
      router.push("/integration");
    }
  } else {
    debouncedShowMessage("请先填好您的姓名", "error");
  }
};
</script>

<style scoped>
body {
  background: #fbd4c5;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

h1 {
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: "Work Sans", sans-serif;
  margin: 0 auto auto auto;
  background: linear-gradient(
    to right,
    #95f8d7,
    #72bbf6,
    #f5074a
  ); /* 渐变背景 */
  font-weight: 800;
  font-size: 70px;
  width: 100%;
  -webkit-background-clip: text; /* 渐变背景 */
  color: transparent; /* 文字颜色透明，以便显示背景渐变 */
  display: inline-block;
}

.flex {
  display: flex;
  justify-content: center;
}

.bg-contianer {
  background-image: url("../../public/images/bgimg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0;
}

/* From Uiverse.io by Sunhotep */
.form__group {
  position: relative;
  padding: 20px 0 0;
  width: 100%;
  max-width: 180px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ffe699;
  outline: 0;
  font-size: 17px;
  color: #918f8f;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 25px;
  cursor: text;
  top: 10px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #dbb440;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #ffe699, #5d3294);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #ffe699;
  font-weight: 700;
}

/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
