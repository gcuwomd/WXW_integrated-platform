<template>
  <div>
    <div class="row-option">
      <el-button
        :icon="Plus"
        @click="addActivity"
        style="margin-left: 10px"
        type="success"
        >新增活动
      </el-button>
    </div>
    <div class="row-card">
      <el-card
        v-for="activity in activites"
        :key="activity.activityId"
        style="margin-top: 10px"
        shadow="hover"
      >
        <template #header>
          <div style="display: flex; align-items: center">
            <img src="../../assets/favicon.png" alt="" class="act-icon" />
            <div style="margin-left: 10px">
              <span>活动名称：{{ activity.activityName }}</span>
              <br />
              <span>活动学年：{{ activity.year }}</span>
            </div>
          </div>
        </template>
        <div style="width: 300px">
          <span> 活动描述： </span>
          <Tooltip
            :text="activity.description"
            :style="{
              fontSize: '16px',
              display: 'inline',
            }"
          >
          </Tooltip>
        </div>
        <template #footer>
          <div style="display: flex; justify-content: space-between">
            <el-button
              @click.prevent="
                toDetail(activity.activityName, activity.activityId)
              "
              style="margin-left: 10px"
              >详情
            </el-button>
            <el-button
              @click="
                opendelDialog(
                  activity.activityId,
                  '确定删除该活动？',
                  deleteActivity
                )
              "
              style="margin-left: 10px"
              type="danger"
              >删除
            </el-button>
          </div>
        </template>
      </el-card>
    </div>
  </div>
  <AddActivity
    :open="isOpen"
    @close="isOpen = false"
    @complete="handleComplete"
  />
  <DeletDialog
    :visible="isDelopen"
    @close="isDelopen = false"
    :title="DeldialogTitle"
    :apiMethod="DelcurrentApiMethod"
    :id="delId"
    @complete="handleComplete"
  />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import Tooltip from "../../components/Tooltip.vue";
import {
  deleteActivity,
  getActivity,
} from "../../api/methods/activity/activity";
import { activityInter } from "../../type/request-data";
import { useRequest } from "alova/client";

const router = useRouter();
const toDetail = (activityName: string, activityId: number) => {
  router.push({
    path: "/activity/ActivityDetails",
    query: { activityName: activityName, activityId: activityId },
  });
};

const activites = ref<activityInter[]>([]);

const { onSuccess: getActivitySuccess, send: getPerGroupsUpdate } = useRequest(
  () => getActivity()
);

getActivitySuccess((res: any) => {
  if (res.data.code == 200) {
    activites.value = res.data.data;
  }
});

const isOpen = ref<boolean>(false);
//新增活动，参与人员、活动名称、活动描述
const addActivity = () => {
  isOpen.value = true;
};
//删除活动
const isDelopen = ref<boolean>(false);
const DeldialogTitle = ref<string>("");
const delId = ref<number>();
const DelcurrentApiMethod = ref<Function>(() => {});
const opendelDialog = (id: number, title: string, api: Function) => {
  DeldialogTitle.value = title;
  DelcurrentApiMethod.value = api;
  delId.value = id;
  isDelopen.value = true;
};

const handleComplete = () => {
  getPerGroupsUpdate();
  isOpen.value = false;
};
</script>

<style scoped>
.row-option {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
}
.row-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
}
.act-icon {
  width: 60px;
  height: 60px;
}
</style>
