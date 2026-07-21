<script setup lang="ts">
import { ref, onMounted } from "vue";
import { nopass } from "../../api/methods/noPass";
import { ElMessage as elmessage } from "element-plus";
import { changepass } from "../../api/methods/status";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import AssessDialog from "../../../src/components/dialog/AssessDialog.vue";
import { useRequest } from "alova"; //aolva 引入
const tableData = ref<any[]>([]);
const total = ref(100);
// const table = ref<InstanceType<typeof ElTable>>();
const isAssessDialogOpen = ref<boolean>(false);
//未通过人员信息
const nopassPerson = async () => {
  updatepass();
};

const { onSuccess: passSuccess, send: updatepass } = useRequest(
  () => nopass(), //部门id
  {
    force: (shouldUpdate: boolean) => shouldUpdate,
    immediate: false,
  }
);
passSuccess((response) => {
  if (response.data.code === 200) {
    let data = response.data.data;
    tableData.value = data;
    total.value = data.length;
  } else if (response.data.code === 401) {
  }
});

onMounted(async () => {
  await nopassPerson();
});

// 修改状态 为通过
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
const handleCheck = async (rowid: string) => {
  updatechange(rowid, "1");
};

const assessId = ref<string>("");

const openAssessDialog = (id: string) => {
  isAssessDialogOpen.value = true;
  assessId.value = id;
};
</script>
<template>
  <div class="container">
    <!-- <el-button size="small" plain disabled>发送请求</el-button> -->
    <div style="margin-top: 30px" class="flex justify-center">
      <el-table ref="table" :data="tableData" style="width: 95%">
        <template v-slot:empty>
          <el-empty description="No Data" />
        </template>
        <el-table-column fixed type="selection" width="80" />
        <el-table-column
          fixed
          prop="username"
          label="Name"
          width="80"
          label-class-name="label-color"
        />
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="phone" label="Phone" width="180" />
        <el-table-column prop="college" label="College" width="180" />
        <el-table-column prop="major" label="Major" width="150" />
        <el-table-column prop="gender" label="Gender" width="180" />
        <el-table-column prop="introduction" label="Introduction" width="180">
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
        <el-table-column label="Button" width="120">
          <template #default="scope">
            <el-button size="small" plain @click="handleCheck(scope.row.id)"
              >通过</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="openAssessDialog(scope.row.id)"
              >提交给下个部门</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <AssessDialog
    :id="assessId"
    :open="isAssessDialogOpen"
    title="评价信息"
    @close="isAssessDialogOpen = false"
    @complete="nopassPerson"
  />
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
.label-color {
  color: black; /* 设置为你想要的颜色 */
}
</style>
