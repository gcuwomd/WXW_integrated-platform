<template>
  <div class="flex items-center justify-center">
    <el-card class="w-80% p-10px mt-20px flex items-center justify-center">
      <el-form
        :model="form"
        label-width="120px"
        style="min-width: 750px"
        class="w-100% flex flex-col justify-center"
        label-position="right"
        size="large"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="管理员参加签到">
          <el-switch v-model="adminjoin" />
        </el-form-item>
        <el-form-item label="签到名称" prop="activity.activityName">
          <el-input v-model="form.activity.activityName" />
        </el-form-item>
        <el-form-item label="签到类型" prop="type">
          <el-radio-group
            v-model="form.activity.typeName"
            :disabled="isDisabled"
            prop="activity.typeName"
          >
            <el-radio-button label="二维码签到" value="二维码签到" />
            <el-radio-button label="位置签到" value="位置签到" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="参与签到对象">
          <el-cascader
            v-model="selectedValues"
            :options="options"
            :props="props"
            collapse-tags
            collapse-tags-tooltip
            clearable
            placeholder="请选择参与对象"
            @change="handleCascaderChange"
          />
        </el-form-item>
        <el-form-item
          v-if="form.activity.typeName === '位置签到'"
          label="签到位置"
          prop="sponsorLocation.distance"
        >
          <el-select
            v-model="form.sponsorLocation.distance"
            placeholder="签到范围"
          >
            <el-option label="100米" value="100" />
            <el-option label="200米" value="200" />
            <el-option label="500米" value="500" />
            <el-option label="1000米" value="1000" />
            <el-option label="2000米" value="2000" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.activity.typeName === '位置签到'">
          <Map @getlocation="handlelocation"></Map
        ></el-form-item>
        <div class="flex items-center">
          <el-form-item label="签到时间">
            <el-time-picker
              v-model="timerangeAsString"
              is-range
              range-separator="To"
              start-placeholder="Start time"
              end-placeholder="End time"
              :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes"
              :disabled-seconds="disabledSeconds"
          /></el-form-item>
        </div>
        <el-form-item label="备注">
          <el-input
            v-model="form.activity.description"
            type="textarea"
            :maxlength="100"
            placeholder="100字以内"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-100% mt-10px"
            type="primary"
            @click="onSubmit(formRef)"
          >
            创建
          </el-button>
        </el-form-item>
      </el-form></el-card
    >
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onBeforeMount, watch } from "vue";
import { formtype } from "../type/request-data";
import { getDepList, getDepmenList } from "../api/methods/getdepList";
import { creatSign } from "../api/methods/creatSign";
import { useRequest } from "alova"; //aolva 引入
// import AMapLoader from "@amap/amap-jsapi-loader"; // 导入AMapLoader
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { debouncedShowMessage } from "../utils/debounce";
import type { FormInstance, FormRules } from "element-plus";
//页面加载前添加部门列表还有对应 人员列表
onBeforeMount(() => {
  updategetdeq(); //在组件渲染前进行请求
});
//创建签到表单
const adminjoin = ref<boolean>(true);
const form: formtype = reactive({
  yesOrNoAdministrator: "",
  activity: {
    activityName: "",
    typeName: "二维码签到",
    startTime: "",
    endTime: "",
    userId: [],
    departmentId: [],
    description: "",
  },
  sponsorLocation: {
    latitude: "",
    longitude: "",
    distance: "",
  },
});

//清空 表单数据
const reset = () => {
  form.yesOrNoAdministrator = "";
  form.activity.activityName = "";
  form.activity.typeName = "二维码签到";
  form.activity.startTime = "";
  form.activity.endTime = "";
  form.activity.userId = [];
  form.activity.departmentId = [];
  form.activity.description = "";
  form.sponsorLocation.latitude = "";
  form.sponsorLocation.longitude = "";
  form.sponsorLocation.distance = "";
  selectedValues.value = [];
};
//提交 创建签到
const onSubmit = async (formEl: FormInstance | undefined) => {
  //请求创建签到接口
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      if (selectedValues.value.length != 0) {
        const startTime = new Date(timerange.value[0]);
        startTime.setHours(startTime.getHours() + 8);
        const isostartTimeString = startTime.toISOString();
        const endTime = new Date(timerange.value[timerange.value.length - 1]);
        endTime.setHours(endTime.getHours() + 8);
        const isoendTimeString = endTime.toISOString();
        form.activity.endTime = isoendTimeString.slice(0, 19);
        form.activity.startTime = isostartTimeString.slice(0, 19);
        form.yesOrNoAdministrator = adminjoin.value.toString();
        updatecreatSign(form);
      } else {
        debouncedShowMessage("请选择参与对象", "error");
      }
    } else {
      debouncedShowMessage("请完善表单信息", "error");
    }
  });
};
//选择人员列表 树形控件
import type { CascaderProps } from "element-plus";
const props: CascaderProps = {
  multiple: true,
  lazy: false,
};
//创建签到接口
const { onSuccess: creatSignSuccess, send: updatecreatSign } = useRequest(
  (form: formtype) => creatSign(form),
  {
    immediate: false,
  }
);
creatSignSuccess((response: any) => {
  if (response.data.code == 200) {
    debouncedShowMessage("发起签到成功", "success");
    resetForm(formRef.value);
    reset();
  } else {
    if (
      response.data.msg === "签到过程中发生错误：某个用户不存在或角色关联不匹配"
    ) {
      debouncedShowMessage("参与对象存在管理员", "warning");
    } else debouncedShowMessage(response.data.msg, "warning");
  }
});
//获取部门列表接口
const { onSuccess: getdepSuccess, send: updategetdeq } = useRequest(
  () => getDepList(),
  {
    force: (shouldUpdate: boolean) => shouldUpdate,
    immediate: false,
  }
);
getdepSuccess(async (response: any) => {
  if (response.data.code == 200) {
    options.value = response.data.data.map((e: any) => {
      return {
        value: e.id,
        label: e.name,
        children: [],
      };
    });
    for (let i = 1; i <= 4; i++) {
      await sentrequest(i);
    }
  }
});
//获取部门下成员列表接口
let depid = ref<number>(); //请求用的
const sentrequest = async (id: number) => {
  depid.value = id;
  await updategetdeqmem(depid.value);
};
const { onSuccess: getdepmemSuccess, send: updategetdeqmem } = useRequest(
  (departmentId: number) => getDepmenList(departmentId),
  {
    immediate: false,
  }
);
getdepmemSuccess((response: any) => {
  if (response.data.code == 200) {
    options.value.forEach((e) => {
      if (e.value === depid.value) {
        e.children = response.data.data.map((e: mem) => {
          let label = e.username;
          if (e.roleId === 2) {
            label += "   (管理员)";
          }
          return {
            value: e.id,
            label: label,
          };
        });
      }
    });
  }
});
// 选择参与对象 渲染的数据 options
interface Option {
  value: number;
  label: string;
  children: op[];
}
interface op {
  value: number;
  label: string;
}
interface mem {
  id: string;
  username: string;
  roleId: number;
}
let options = ref<Option[]>([]);
//添加子组件
const selectedValues = ref([]); // 绑定的选中值 树形控件
const selectedDepartments = ref<number[]>([]); // 存储选中的部门ID
const selectedEmployees = ref<number[]>([]); // 存储选中的人员ID
// 树形控件 选择框 改变 进入该方法 设置 部门id 数组  还有  人员id 数组
const handleCascaderChange = (value: any) => {
  // 清空已选中的部门和人员ID
  selectedDepartments.value = [];
  selectedEmployees.value = [];
  value.forEach((item: any) => {
    // 判断选中的节点类型，0 为部门，1 为人员
    let list: number[] = [...(item as number[])]; // 类型断言
    selectedEmployees.value.push(list[1]);
    let flag = true; //表示每个都有
    let dep = options.value.filter((e) => {
      return e.value === list[0];
    });
    dep[0].children.forEach((e) => {
      if (selectedEmployees.value.includes(e.value)) {
        return;
      } else {
        flag = false;
      }
    });
    if (flag) {
      //如果部门全部被选中 则 清空 选中人员id
      selectedDepartments.value.push(list[0]);
      //清空 该部门内 children 的所有 id
      let valuelist = dep[0].children?.map((e) => {
        return e.value;
      });
      let filterArray = selectedEmployees.value.filter((e) => {
        return !valuelist.includes(e);
      });
      selectedEmployees.value = filterArray;
    }
  });
  form.activity.departmentId = [...selectedDepartments.value];
  form.activity.userId = [...selectedEmployees.value];
};
//地图组件  接收子组件传参
const handlelocation = (param: { longitude: number; latitude: number }) => {
  form.sponsorLocation.latitude = param.latitude.toString();
  form.sponsorLocation.longitude = param.longitude.toString();
  if (param) {
    debouncedShowMessage("获取位置成功", "success");
    isDisabled.value = false;
  }
};

//地图组件
// 自动获取当前定位
//高德地图api
// const getlocation = () => {
//   //先要清除掉之前的 地图 防止多种api 运行
//   // AMapLoader.reset();
//   //定义
//   AMapLoader.load({
//     key: "7ae024f8ad376782ca6a490dfa3a9768",
//     version: "1.4.15",
//     plugins: [
//       "AMap.ToolBar",
//       "AMap.Geolocation",
//       "AMap.AutoComplete",
//       "AMap.Geocoder",
//     ],
//   })
//     .then((AMap) => {
//       const geolocation = new AMap.Geolocation({
//         enableHighAccuracy: true,
//         timeout: 10000,
//         buttonOffset: new AMap.Pixel(10, 20),
//         zoomToAccuracy: true,
//         buttonPosition: "RB",
//       });
//       geolocation.getCurrentPosition((status: any, result: any) => {
//         if (status === "complete") {
//           const latitude = result.position.lat;
//           const longitude = result.position.lng;
//           //获取到后 进行 表单的赋值
//           form.sponsorLocation.longitude = longitude;
//           form.sponsorLocation.latitude = latitude;
//           console.log(longitude, latitude);
//           ElMessage({
//             message: "获取位置成功",
//             type: "success",
//           });
//           isDisabled.value = false;
//         } else {
//           console.error("获取用户位置失败:", result);
//           ElMessage.error("获取位置失败");
//           isDisabled.value = false;
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("加载地图库时出错:", error);
//       ElMessage.error("地图加载出错");
//     });
// };
//监听签到类型的切换  切换为位置签到  开始获取位置  增加rules
const isDisabled = ref<boolean>(false);
watch(
  () => form.activity.typeName,
  () => {
    if (form.activity.typeName === "位置签到") {
      ElMessage({
        message: "获取位置中....",
        type: "warning",
      });
      isDisabled.value = true;
      // getlocation(); 更换为 腾讯地图api
      rules["sponsorLocation.distance"] = [
        {
          required: true,
          message: "Please input distance",
          trigger: "change",
        },
      ];
    } else {
      // 是扫码签到就清空
      console.log("clear");
      rules["sponsorLocation.distance"] = [];
      form.sponsorLocation.longitude = "";
      form.sponsorLocation.latitude = "";
      form.sponsorLocation.distance = "";
    }
  }
);

// 表单验证  模块
const formRef = ref<FormInstance>();
//重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const rules = reactive<FormRules<formtype>>({
  "activity.activityName": [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur",
    },
  ],
  "activity.startTime": [
    {
      required: true,
      message: "Please input startTime",
      trigger: "blur",
    },
  ],
  "activity.endTime": [
    {
      required: true,
      message: "Please input endTime",
      trigger: "blur",
    },
  ],
});
//时间设置
const currentTime = new Date();
const laterTime = new Date(currentTime);
laterTime.setHours(currentTime.getHours());
//定义时间范围
const timerange = ref([currentTime, laterTime]);

const timerangeAsString = timerange.value.map((date) => date.toISOString());

//限制时间选择 不能早于当前时间
const disabledHours = () => {
  const a = [];
  for (let i = 0; i < 24; i++) {
    // 限制之前 < 之后 > ，下面同理
    if (new Date().getHours() <= i) continue;
    a.push(i);
  }
  return a;
};
const disabledMinutes = () => {
  const a = [];
  for (let i = 0; i < 60; i++) {
    // 限制之前 < 之后 > ，下面同理
    if (new Date().getMinutes() + 2 <= i) continue;
    a.push(i);
  }
  return a;
};
const disabledSeconds = () => {
  const a = [];
  for (let i = 0; i < 60; i++) {
    // 限制之前 < 之后 > ，下面同理
    if (new Date().getSeconds() < i) continue;
    a.push(i);
  }
  return a;
};
</script>

<style scoped></style>
