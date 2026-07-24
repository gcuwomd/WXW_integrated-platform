<script setup lang="ts">
import { ref, onMounted } from "vue";
import { willpass } from "../../api/methods/willPass";
import { getassess } from "../../api/methods/getAssess";
import { ElMessage as elmessage } from "element-plus";
import { changepass } from "../../api/methods/status";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { useRequest } from "alova"; //aolva 引入
import { getDeptName } from "../../utils/constants";
const tableData = ref<any[]>([]);

// 从volunteer数据（支持JSON字符串、数组和对象三种格式）中提取指定level的志愿部门名称
const getVolunteerDept = (volunteer: any, level: string): string => {
  if (!volunteer) return '-';
  // 如果volunteer是JSON字符串，先解析
  let volData = volunteer;
  if (typeof volData === 'string') {
    try {
      volData = JSON.parse(volData);
    } catch {
      return getDeptName(volunteer[level]) || '-';
    }
  }
  if (Array.isArray(volData)) {
    const item = volData.find((v: any) => String(v.level) === level);
    return item?.departmentId ? getDeptName(item.departmentId) : '-';
  }
  return volData[level] ? getDeptName(volData[level]) : '-';
};

// const table = ref<InstanceType<typeof ElTable>>();
//未处理人员信息
const { onSuccess: passSuccess, send: updatepass } = useRequest(
  () => willpass(), //部门id
  {
    force: (shouldUpdate: boolean) => shouldUpdate,
    immediate: false,
  }
);
passSuccess((response) => {
  if (response.data.code === 200) {
    let data = response.data.data;
    tableData.value = data;
  } else {
  }
});

const willpassPerson = async () => {
  updatepass();
};

onMounted(async () => {
  await willpassPerson();
});

// 修改状态 为未通过或通过
const { onSuccess: changepassSuccess, send: updatechange } = useRequest(
  (id: string, status: string) => changepass(id, status), //学号id
  {
    immediate: false,
  }
);
changepassSuccess(async (response) => {
  if (response.data.code === 200) {
    elmessage.success("修改成功");
    await updatepass();
  } else {
    elmessage.error("修改失败");
  }
});

const handleSuccess = async (rowid: string) => {
  updatechange(rowid, "1");
};
const handleError = async (rowid: string) => {
  updatechange(rowid, "2");
};
const dialogVisible = ref(false);
const dataList = ref();
//getassess 通过id获取评价信息
const { onSuccess: getassessSuccess, send: updategetassess } = useRequest(
  (id: string) => getassess(id), //学号id
  {
    immediate: false,
  }
);
getassessSuccess((response) => {
  if (response.data.code === 200) {
    dataList.value = response.data.data;
    dialogVisible.value = true;
  } else {
  }
});

const getassessMsg = async (id: string) => {
  updategetassess(id);
};
</script>
<template>
  <div class="container">
    <!-- <el-button size="small" plain disabled>发送请求</el-button> -->
    <div style="margin-top: 10px" class="flex justify-center">
      <el-table ref="table" :data="tableData" style="width: 90%">
        <template v-slot:empty>
          <el-empty description="No Data" />
        </template>
        <el-table-column fixed type="selection" width="80" />
        <el-table-column fixed prop="username" label="姓名" width="80" />
        <el-table-column prop="student_id" label="学号" width="180" />
        <el-table-column prop="phone" label="手机号" width="180" />
        <el-table-column prop="college" label="学院" width="180" />
        <el-table-column prop="major" label="专业" width="180" />
        <el-table-column label="第一志愿" width="180">
          <template #default="scope">
            {{ getVolunteerDept(scope.row.volunteer, '1') }}
          </template>
        </el-table-column>
        <el-table-column label="第二志愿" width="180">
          <template #default="scope">
            {{ getVolunteerDept(scope.row.volunteer, '2') }}
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="180" />
        <el-table-column prop="introduction" label="介绍" width="180">
          <template #default="scope">
            <el-tooltip
              :content="scope.row.introduction"
              raw-content
              placement="top-start"
              v-if="scope.row.introduction"
            >
              <span
                v-if="
                  scope.row.introduction && scope.row.introduction.length <= 10
                "
              >
                {{ scope.row.introduction }}
              </span>
              <span
                v-if="
                  scope.row.introduction && scope.row.introduction.length > 10
                "
              >
                {{ scope.row.introduction.substr(0, 10) + "..." }}
              </span>
            </el-tooltip>
            <span v-else-if="scope.row.introduction === null"> Null </span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="Image" align="center" width="180">
          <template #default="scope">
            <div class="block text-center">
              <el-carousel
                height="70px"
                :autoplay="false"
                indicator-position="outside"
              >
                <el-carousel-item
                  v-for="(val, index) in scope.row.image"
                  :key="index"
                >
                  <el-image
                    style="width: 70px; height: 70px"
                    :src="val"
                    :zoom-rate="1.2"
                    :preview-src-list="[val]"
                    :initial-index="4"
                    fit="cover"
                    :hide-on-click-modal="true"
                    :preview-teleported="true"
                  >
                    <template #error>
                      <div class="demo-image__error">
                        <div class="block">
                          <el-image>
                            <template #error>
                              <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                              </div>
                            </template>
                          </el-image>
                        </div>
                      </div>
                    </template>
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="180">
          <template #default="scope">
            <el-button size="small" plain @click="handleSuccess(scope.row.student_id)"
              >通过</el-button
            >
            <el-button size="small" plain @click="handleError(scope.row.student_id)"
              >未通过</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="180">
          <template #default="scope">
            <el-button size="small" plain @click="getassessMsg(scope.row.student_id)"
              >查看评价信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="评价信息">
    <div class="assessMsg">
      <ul>
        <li v-for="(item, index) in dataList">
          第{{ index + 1 }}条评价: {{ item.comment }}
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<style scoped>
.container {
  width: 100%;
}

.table {
  margin: 10px 0;
}

.input-with-select {
  width: 380px;
  margin-right: 20px;
}

.pagination-center {
  margin-top: 10px;
  justify-content: center;
  align-items: center;
}

:deep(table tr span.el-tooltip__trigger) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-image__error .block {
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 70px;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__error .el-image {
  width: 70px;
  height: 70px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.assessMsg {
  padding: 10px;
}
ul {
  list-style-type: none;
  border: 2px solid;
  box-shadow: 0 0 0 10px white;
  border-radius: 10px;
}
li {
  font-family: Arial;
  font-size: 16px;
  margin: 5px;
}
</style>
