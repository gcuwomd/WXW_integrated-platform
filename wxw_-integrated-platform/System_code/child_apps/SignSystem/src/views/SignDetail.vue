<script setup lang="ts">
import { reactive, ref, toRef } from "vue";
import { useRouter } from "vue-router";
import { getSignDetail } from "../api/methods/getSignDetail";
import { stopSign } from "../api/methods/stopSign";
import { useRequest } from "alova";
// import { signed, meeting } from "../../type/respon-data";
import { changeSigned, changeUnSigned } from "../api/methods/changeSigned";
import { delAct } from "../api/methods/deleteAct";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { debouncedShowMessage } from "../utils/debounce";

const router = useRouter();
const actName = toRef<string>(history.state.activityName);

// const status = toRef<string>(history.state.status);

interface meetinguse {
  time: string;
  endTime: string;
  peopleNumber: string;
  activityName?: string;
  departmentName: string[];
  typeName: string;
  signData: signeduse[];
}
interface signeduse {
  userName: string;
  id: string;
  status: string; // 已签 未签
  departmentName: string;
  signinTime: string;
}
let meetingDescribe = reactive<meetinguse>({
  time: "",
  endTime: "",
  peopleNumber: "",
  activityName: actName.value,
  departmentName: [],
  typeName: "",
  signData: [],
});

const deplist = ref("");
const { onSuccess: getSignDetailInfo, send: updateDetail } = useRequest(
  getSignDetail(actName.value),
  {
    force: (shouldForce: boolean) => shouldForce,
  }
);
getSignDetailInfo((response) => {
  let data = response.data.data;

  meetingDescribe.endTime = data.endTime.replace("T", " ");
  meetingDescribe.typeName = data.typeName;
  meetingDescribe.peopleNumber = data.peopleNumber;
  meetingDescribe.signData = data.signData.map((e) => {
    return {
      userName: e.userName,
      id: e.id,
      status: e.status == 0 ? "未签到" : "已签到",
      signinTime: e.signinTime || "待签",
      departmentName: e.departmentName,
    };
  });
  filterarray.value = data.departmentName.map((e: string) => {
    return {
      text: e,
      value: e,
    };
  });
  deplist.value = data.departmentName.join("、");
});
//补签
const resign = (rowid: string, signreq: boolean) => {
  // 接后端
  if (signreq == false) {
    const { onSuccess: changesuccess } = useRequest(
      changeUnSigned(rowid, meetingDescribe.activityName as string)
    ); // 改为未签
    changesuccess((res) => {
      if (res.data.code === 200) {
        updateDetail(actName);
        // ElMessage({
        //   type: "success",
        //   message: "修改成功",
        // });
        debouncedShowMessage("修改成功", "success");
        changeStatusdialogVisible.value = false;
      } else {
        // ElMessage({
        //   type: "error",
        //   message: "修改失败",
        // });
        debouncedShowMessage("修改失败", "error");
        changeStatusdialogVisible.value = false;
      }
    });
  } else {
    const { onSuccess: changesuccess } = useRequest(
      changeSigned(rowid, meetingDescribe.activityName as string)
    ); // 改为已签
    changesuccess((res) => {
      if (res.data.code === 200) {
        updateDetail(actName);
        debouncedShowMessage("修改成功", "success");
        changeStatusdialogVisible.value = false;
      } else {
        debouncedShowMessage("修改失败", "error");
        changeStatusdialogVisible.value = false;
      }
    });
  }
};

//提前结束签到
const { send: signover } = useRequest((name: string) => stopSign(name), {
  immediate: false,
});
const stopsign = async () => {
  signover(meetingDescribe.activityName as string).then((res) => {
    dialogVisible.value = false;
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: "成功",
      });
      router.back();
    } else {
      ElMessage({
        type: "error",
        message: "提前结束失败",
      });
    }
  });
};
//删除签到活动
const { onSuccess: signdelsuccess, send: signdel } = useRequest(
  (name: string) => delAct(name),
  {
    immediate: false,
  }
);
signdelsuccess((response) => {
  if (response.data.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    deldialogVisible.value = false;
    router.push("/SignInInfo");
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
});
//删除活动
const delsign = async () => {
  signdel(meetingDescribe.activityName as string);
};
const dialogVisible = ref(false);
const deldialogVisible = ref(false);
const changeStatusdialogVisible = ref(false);

//表格过滤  过滤状态
const filterTag = (value: string, row: signeduse) => {
  return row.status === value;
};
//表格过滤  过滤部门
const filterDp = (value: string, row: signeduse) => {
  return row.departmentName === value;
};
interface filterdemo {
  text: string;
  value: string;
}
const filterarray = ref<filterdemo[]>([]);

const changeid = ref<string>("");
const dialogTitle = ref<string>("");
const changestatus = ref<boolean>(true);
const changestatusmethod = (id: string, status: boolean) => {
  changeid.value = id;
  if (status) {
    dialogTitle.value = "确定修改为已签到";
  } else {
    dialogTitle.value = "确定修改为未签到";
  }
  changestatus.value = status;
  changeStatusdialogVisible.value = true;
};
import type { ComponentSize } from "element-plus";
const size = ref<ComponentSize>("default");
</script>
<template>
  <div class="m-5">
    <section class="mt-4">
      <el-card>
        <el-descriptions :size="size" :column="2" border>
          <template #title>
            <h2 class="color-#347ce7">
              {{ meetingDescribe.activityName }}
            </h2>
          </template>
          <template #extra>
            <!-- <el-button
              :disabled="status != '正在进行'"
              type="primary"
              @click="
                () => {
                  dialogVisible = true;
                }
              "
              >提前结束签到</el-button
            >-->
            <el-button
              type="danger"
              @click="
                () => {
                  deldialogVisible = true;
                }
              "
              >删除签到活动</el-button
            >
          </template>
          <el-descriptions-item label="结束时间">{{
            meetingDescribe.endTime
          }}</el-descriptions-item>
          <el-descriptions-item label="签到人数比">{{
            meetingDescribe.peopleNumber
          }}</el-descriptions-item>
          <el-descriptions-item label="签到类型">{{
            meetingDescribe.typeName
          }}</el-descriptions-item>
          <el-descriptions-item label="参与部门">{{
            deplist
          }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </section>
    <section class="mt-8">
      <div class="flex">
        <div class="w-100% m-1">
          <el-table :data="meetingDescribe.signData" style="width: 100%" stripe>
            <el-table-column prop="userName" label="人名" />
            <el-table-column
              label="所属部门"
              prop="departmentName"
              :filters="filterarray"
              :filter-method="filterDp"
            />
            <el-table-column prop="signinTime" label="签到时间" />
            <el-table-column
              label="状态"
              prop="status"
              :filters="[
                { text: '未签到', value: '未签到' },
                { text: '已签到', value: '已签到' },
              ]"
              :filter-method="filterTag"
            />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="warning"
                  plain
                  size="small"
                  @click="
                    {
                      changestatusmethod(scope.row.id, true);
                    }
                  "
                  v-if="scope.row.status === '未签到'"
                  >补签</el-button
                ><el-button
                  type="info"
                  plain
                  size="small"
                  @click="
                    {
                      changestatusmethod(scope.row.id, false);
                    }
                  "
                  v-if="scope.row.status === '已签到'"
                  >未签</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
      </div>
    </section>
  </div>
  <el-dialog v-model="dialogVisible" width="400" title="确定提前结束签到">
    <el-button type="warning" plain size="small" @click="dialogVisible = false"
      >取消</el-button
    >
    <el-button type="warning" size="small" @click="stopsign()">确定</el-button>
  </el-dialog>
  <el-dialog v-model="deldialogVisible" width="400" title="删除签到活动">
    <el-button
      type="warning"
      plain
      size="small"
      @click="deldialogVisible = false"
      >取消</el-button
    >
    <el-button type="warning" size="small" @click="delsign()">确定</el-button>
  </el-dialog>
  <el-dialog
    width="400"
    :title="dialogTitle"
    v-model="changeStatusdialogVisible"
  >
    <el-button
      type="warning"
      plain
      size="small"
      @click="changeStatusdialogVisible = false"
      >取消</el-button
    >
    <el-button
      type="warning"
      size="small"
      @click="resign(changeid, changestatus)"
      >确定</el-button
    >
  </el-dialog>
</template>
<style scoped></style>
