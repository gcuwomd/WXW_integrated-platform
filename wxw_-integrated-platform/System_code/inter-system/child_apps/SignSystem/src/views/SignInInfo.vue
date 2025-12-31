<template>
  <el-header style="" class="line">
    <el-row class="m-t-3">
      <el-col :span="3">
        <el-button type="primary" :icon="RefreshRight" @click="refreshInfo">
          <span>刷新页面</span>
        </el-button>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="input"
          style="width: 200px"
          placeholder="请输入活动名称"
          @keydown.enter="keyDown"
        >
          <template #suffix>
            <el-icon @click="filterActName"><Search /></el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" :icon="Grid" circle @click="filterQrcode" />
        <span style="color: black; margin-left: 10px">显示二维码签到信息</span>
      </el-col>
      <el-col :span="5">
        <el-button
          type="primary"
          :icon="Location"
          circle
          @click="filterMapcode"
        /><span style="color: black; margin-left: 10px"> 显示位置签到信息</span>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" :icon="Download" @click="download">
          下载统计信息</el-button
        >
      </el-col>
    </el-row>
  </el-header>
  <div class="flex flex-wrap gap-8 m-l-3% m-t-8">
    <el-card
      v-for="(info, index) in signInfos"
      :key="index"
      :class="`card card-${index % 4}`"
      class="w-280px h-320px"
      shadow="hover"
      @click="toDetail(info.activityName, info.status)"
    >
      <template #header>
        <div class="icon">
          <el-icon :size="25" @click.stop="delSignInfo(info.activityName)">
            <Close />
          </el-icon>
        </div>
      </template>
      <el-row class="flex justify-center items-center h-1/2">
        <el-col :span="24">
          <div
            class="text-4xl text-center m-t-20% m-b-10% font-800"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ info.activityName }}
          </div>
          <div class="text-2xl text-center m-b-8">{{ info.typeName }}</div>
        </el-col>
      </el-row>
      <el-row class="flex justify-center items-center h-1/6 hidden-info">
        <el-col :span="24">
          <div class="text-4">活动状态：{{ info.status }}</div>
        </el-col>
      </el-row>
      <el-row class="flex justify-between m-t-5 items-center h-1/4 hidden-info">
        <el-col :span="12">
          <div class="text-4">未签：{{ info.notSigned }}</div>
        </el-col>
        <el-col :span="12">
          <div class="text-4">已签：{{ info.signed }}</div>
        </el-col>
      </el-row>
      <el-row class="flex justify-center items-center h-1/6 hidden-info">
        <el-col :span="24">
          <div class="text-4">签到率：{{ info.rate }}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div class="container" v-if="transformStore.isNull">
    <div class="mt-50">
      <el-empty description="未查询到该信息！" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RefreshRight,
  Search,
  Location,
  Grid,
  Close,
  Download,
} from "@element-plus/icons-vue";
import { ref, toRaw, watch, nextTick, onMounted } from "vue";
import { getSignList } from "../api/methods/getSignList";
import { delAct } from "../api/methods/deleteAct";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRequest } from "alova";
import { signList } from "../type/response-data";
import router from "../router/routers";
import { useTransformStore } from "../store/transform";
import { useStore } from "../store/user";
const input = ref<string>("");
const signInfos = ref<signList[]>([]);
const newSignInfos = ref<signList[]>([]);
const transformStore = useTransformStore();
onMounted(() => {
  updateSignInfo();
});
const { onSuccess: getSignInfo, send: updateSignInfo } = useRequest(
  getSignList(),
  {
    force: (shouldForce: boolean) => shouldForce,
    immediate: false,
  }
);
getSignInfo((response) => {
  signInfos.value = transformStore.signInfos = response.data.data;
});

watch(
  () => newSignInfos.value,
  () => {
    signInfos.value = newSignInfos.value;
  }
);

const toDetail = (actName: string, status: string) => {
  router.push({
    name: "签到具体信息",
    state: { activityName: actName, status: status },
  });
};

const delSignInfo = (actName: string) => {
  ElMessageBox.confirm("是否删除该签到信息?", "操作", {
    autofocus: false,
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const { onSuccess } = useRequest(delAct(actName), {
        force: (shouldForce: boolean) => shouldForce,
      });
      onSuccess((res) => {
        if (res.data.code === 200) {
          ElMessage({
            type: "success",
            message: "成功",
          });
          updateSignInfo();
        } else {
          ElMessage({
            type: "error",
            message: "删除失败",
          });
        }
      });
    })
    .catch(() => {
      // ElMessage({
      //   type: "warning",
      //   message: "取消",
      // });
    });
};

const filterQrcode = () => {
  newSignInfos.value = transformStore.signInfos.filter((item: signList) => {
    if (item.typeName === "二维码签到") {
      nextTick(() => {
        transformStore.isNull = false;
      });
      return toRaw(item);
    }
  });
};
const filterMapcode = () => {
  newSignInfos.value = transformStore.signInfos.filter((item: signList) => {
    if (item.typeName === "位置签到") {
      return toRaw(item);
    }
  });
};
const filterActName = () => {
  newSignInfos.value = transformStore.signInfos.filter((item: signList) => {
    if (item.activityName.includes(input.value)) {
      nextTick(() => {
        transformStore.isNull = false;
      });
      return toRaw(item);
    } else {
      transformStore.isNull = true;
      newSignInfos.value = [];
    }
  });
};

const keyDown = () => {
  filterActName();
};
//刷新方法可优化
const refreshInfo = () => {
  updateSignInfo();
  transformStore.isLoading = true;
  transformStore.isRouterAlive = false;
  setTimeout(() => {
    transformStore.isNull = false;
    transformStore.isRouterAlive = true;
    transformStore.isLoading = false;
  }, 1500);
};
const download = async () => {
  const store = useStore();
  const token = store.childtoken;
  fetch("https://nc-wxwjcwg.gcu.edu.cn/sign/signin/statistics", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    })
    .then((response) => {
      const contentDisposition = response.headers.get("Content-Disposition");
      const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
      if (contentDisposition) {
        const result = patt.exec(contentDisposition);
        console.log(result);
      }
      return response.blob();
    })
    .then((data) => {
      let url = window.URL.createObjectURL(data);
      let a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.setAttribute("download", "excel.xlsx");
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error("There was a problem with the request:", error);
    });
};
</script>

<style scoped>
.line {
  width: 100%;
  border-bottom: 1px solid var(--el-border-color);
}

.el-card ::v-deep(.el-card__header) {
  padding: 10px;
  border-bottom: none !important;
}

.icon {
  position: absolute;
  float: right;
}

.hidden-info {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.card:hover .hidden-info {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.5s linear;
}

.card-0,
.card-1,
.card-2,
.card-3 {
  width: 270px;
  height: 220px;
  background-size: 200% 200%;
  animation: Gradient 5s ease infinite;
  color: #065eb6;
  transition: transform 0.5s, height 0.5s;
}

.card-0 {
  background: linear-gradient(
    135deg,
    #85c1e91a 0%,
    #f7dc6f1a 33%,
    #f1948a1a 66%,
    #82e0ab1a 100%
  );
}

.card-1 {
  background: linear-gradient(
    135deg,
    #f7dc6f1a 0%,
    #f1948a1a 33%,
    #82e0ab1a 66%,
    #85c1e91a 100%
  );
}

.card-2 {
  background: linear-gradient(
    135deg,
    #f1948a1a 0%,
    #82e0ab1a 33%,
    #85c1e91a 66%,
    #f7dc6f1a 100%
  );
}

.card-3 {
  background: linear-gradient(
    135deg,
    #82e0ab1a 0%,
    #85c1e91a 33%,
    #f7dc6f1a 66%,
    #f1948a1a 100%
  );
}

.card-0:hover,
.card-1:hover,
.card-2:hover,
.card-3:hover {
  transform: scale(1.1);
  background-size: 200% 200%;
  animation: Gradient 5s ease infinite;
  height: 320px;
  transition: transform 0.5s, height 0.5s;
}

.card-0:hover {
  background: linear-gradient(
    135deg,
    #85c1e94d 0%,
    #f7dc6f4d 33%,
    #f1948a4d 66%,
    #82e0ab4d 100%
  );
}

.card-1:hover {
  background: linear-gradient(
    135deg,
    #f7dc6f4d 0%,
    #f1948a4d 33%,
    #82e0ab4d 66%,
    #85c1e94d 100%
  );
}

.card-2:hover {
  background: linear-gradient(
    135deg,
    #f1948a4d 0%,
    #82e0ab4d 33%,
    #85c1e94d 66%,
    #f7dc6f4d 100%
  );
}

.card-3:hover {
  background: linear-gradient(
    135deg,
    #82e0ab4d 0%,
    #85c1e94d 33%,
    #f7dc6f4d 66%,
    #f1948a4d 100%
  );
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
.el-header {
  height: 50px;
}
</style>
