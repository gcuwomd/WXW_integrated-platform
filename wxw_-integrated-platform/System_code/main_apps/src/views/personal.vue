<template>
  <div>
    <div class="w-screen h-screen bg-white bg-contianer">
      <div class="w-100% flex">
        <div class="left w-20% p-20px">
          <div class="card" style="position: relative">
            <div class="img">
              <img
                src="/images/userimg.png"
                alt=""
                class="w-100%"
                style="border-radius: 30%"
                @click="toclick()"
              />
            </div>
            <div class="info">
              <span>{{ user.username }}</span>
              <p>{{ user.department }}</p>
            </div>
          </div>
        </div>
        <div class="right w-70% flex flex-wrap mt-20px justify-center">
          <el-card style="width: 100%">
            <el-descriptions
              title="个人信息"
              direction="vertical"
              border
              style="
                margin-top: 10px;
                width: 100%;
                background-color: transparent; /* 设置背景完全透明 */
              "
              :column="4"
            >
              <el-descriptions-item
                :rowspan="2"
                :width="140"
                label="头像"
                align="center"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  src="/images/userimg.png"
                />
              </el-descriptions-item>
              <el-descriptions-item label="姓名">{{
                user.username
              }}</el-descriptions-item>
              <el-descriptions-item label="学号">{{
                user.id
              }}</el-descriptions-item>
              <el-descriptions-item label="年级">{{
                user.grade
              }}</el-descriptions-item>
              <el-descriptions-item label="部门">{{
                user.department
              }}</el-descriptions-item>
              <el-descriptions-item label="职务">{{
                user.role
              }}</el-descriptions-item
              ><el-descriptions-item label="操作"
                ><el-button type="primary" @click="opendialog()"
                  >操作</el-button
                ></el-descriptions-item
              >
              <el-descriptions-item label="电话">{{
                user.phone
              }}</el-descriptions-item
              ><el-descriptions-item label="邮箱">{{
                user.email
              }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </div>
      </div>
      <div
        class="text-18px font-semibold flex items-center justify-center w-100% fixed bottom-0"
      >
        <img src="../../public/images/wxw.png" alt="" class="w-40px h-40px" />
        <p class="text-#353e54">学生网络与信息工作委员会</p>
      </div>
    </div>
  </div>
  <el-dialog v-model="updateUserVisable" title="用户信息修改" width="500">
    <el-form
      :model="updateuser"
      label-width="auto"
      style="max-width: 600px; margin: 20px"
      :label-position="labelPosition"
      :close-on-click-modal="true"
      ><el-form-item label="姓名">
        <el-input v-model="updateuser.username"
      /></el-form-item>
      <el-form-item label="年级">
        <el-input v-model="updateuser.grade"
      /></el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="updateuser.email"
      /></el-form-item>
      <el-form-item label="电话">
        <el-input v-model="updateuser.phone" /></el-form-item
    ></el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateUserVisable = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            {
              updateUserVisable = false;
              updateUser();
            }
          "
        >
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getUserInformation,
  updateUserInformation,
} from "../api/methods/userInformation";
import { getdepartmentlist } from "../api/methods/departmentInformation";
import { getrolelist } from "../api/methods/roleInformation";
import { userList, departmentList, roleList } from "../type/respon-data";
import type { FormProps } from "element-plus";
import { useStore } from "../store/user";
import { debouncedShowMessage } from "../utils/debounce";

const store = useStore();
const labelPosition = ref<FormProps["labelPosition"]>("right");

const router = useRouter();
const toclick = () => {
  router.push("/integration");
};
// 更改角色对话框
const updateUserVisable = ref(false);
const opendialog = async () => {
  updateuser.value = user.value; // 将原本的值赋进表单中
  updateUserVisable.value = true; // 打开对话框
  if (dlist.value.length == 0 || rlist.value.length == 0) {
    //都为空 才去做
    await getDlist();
    await getRlist();
  }
};
const user = ref<userList>({
  id: "",
  username: "",
  departmentId: null,
  department: "",
  grade: null,
  roleId: null,
  role: "",
  avatar: "/images/userimg.png",
  email: "",
  phone: "",
  createTime: "",
  status: null,
});
interface updateUserList {
  id: string | null;
  username: string | null;
  grade: number | null;
  email: string | null;
  phone: string | null;
}
const updateuser = ref<updateUserList>({
  id: null,
  username: "",
  grade: null,
  email: "",
  phone: "",
});
//部门列表
const dlist = ref<departmentList[]>([]);
//角色列表
const rlist = ref<roleList[]>([]);

// 获取个人信息请求
const getUser = async () => {
  let data = (await getUserInformation()).data;
  user.value = data;
};

//获取部门列表
const getDlist = async () => {
  let data = (await getdepartmentlist()).data;
  dlist.value = data; //赋值
};
// 获取角色列表
const getRlist = async () => {
  let data = (await getrolelist()).data;
  rlist.value = data; // 赋值
};
// 更新用户信息
const updateUser = async () => {
  let data = await updateUserInformation(updateuser.value);
  if (data.code == 200) {
    //更新成功 清除 store 返回登录
    store.$reset();
    router.push("/login");
    debouncedShowMessage("修改成功，请重新登录", "success");
  }
  updateUserVisable.value = false;
};

// // 事件处理函数：选中时打印部门名称
// function handleSelectChange(value: number) {
//   const selectedItem = dlist.value.find((item) => item.id === value);
//   if (selectedItem) {
//     console.log("选中的部门名称是:", selectedItem.name);
//     updateuser.value.department = selectedItem.name;
//   }
// }

onMounted(() => {
  getUser();
});

// //获取 id 对应角色名称
// const getRoleName = (rid: number) => {
//   const role = rlist.value.find((item) => item.id === rid);
//   return role ? role.name : "Please input"; // 如果找不到对应的角色，返回默认提示文字
// };
</script>

<style scoped>
/* .line {
  width: 100%;
  height: 50px;
  border-top: 1px solid #e1e3e1; 
  color: black;
  font-size: 15px;
  display: flex;
  align-item: center;
} */
.cardbox {
  border-radius: 8px;
  border: 1px solid #e1e3e1;
  width: 100%;
}

.card {
  width: 160px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f3;
  border-radius: 12px;
  box-shadow: inset 2px 2px 10px #a9a9aa77, inset -5px -5px 10px #ffffff7e;
}

.card .img {
  height: 100px;
  margin-top: 1.6em;
  aspect-ratio: 1;
  border-radius: 30%;
  background: #f2f2f3;
  margin-bottom: 0.4em;
  box-shadow: -5px -5px 8px #ffffff7a, 5px 5px 8px #a9a9aa7a;
}

.card .info {
  text-align: center;
  margin-top: 0.4em;
  background: linear-gradient(
    120deg,
    rgba(0, 194, 255, 1) 0%,
    rgba(0, 86, 255, 1) 100%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card .info > span {
  font-weight: bold;
  font-size: 1.2em;
}

.card a {
  margin-top: 1em;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(
    90deg,
    rgba(0, 194, 255, 1) 0%,
    rgba(0, 86, 255, 1) 100%
  );
  padding: 0.5em 2em;
  border-radius: 0.7em;
}

.card a:active {
  box-shadow: inset 3px 3px 3px #0056ff, inset -3px -3px 3px #00c2ff;
}
.bg-contianer {
  background-image: url("../../public/images/bg11.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0;
}
:deep(tr) {
  background: transparent;
  height: 50px;
}
:deep(.el-descriptions__cell) {
  font-size: 100px;
}
</style>
