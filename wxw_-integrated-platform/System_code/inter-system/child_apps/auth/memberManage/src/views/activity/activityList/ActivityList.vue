<script setup lang="ts">
import {
  getDepList,
  getDepMemberList,
} from "../../../api/methods/department/depart";
import {
  addMember,
  delMember,
  getPeople,
} from "../../../api/methods/activity/activity";
import { departmentMemberList } from "../../../type/response-data";
import type { TableInstance, CascaderProps } from "element-plus";
import { useAppStore } from "../../../store/index";
import { useRequest } from "alova/client";
// 获取 id
const store = useAppStore();
const activityId = ref<number>(store.activityId);

interface User {
  userId: number;
  userName: string;
  departmentName: string;
}

const allTableData = ref<User[]>([]);

const { onSuccess: getPeopleSuccess, send: update } = useRequest(() =>
  getPeople(activityId.value)
);
getPeopleSuccess((res: any) => {
  if (res.data.code == 200) {
    allTableData.value = res.data.data;
    console.log(res);
  }
});

//多选框
const selectable = ref();
const multipleTableRef = ref<TableInstance>();
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

//前端限制分页（tableData为当前展示页表格）
const page = reactive<{
  currentPage: number;
  size: number;
  total: number;
}>({
  currentPage: 1,
  size: 10,
  total: 10,
});

const tableData = () => {
  //total总页数实际值
  page.total = allTableData.value.length;
  return allTableData.value.filter(
    (_item: any, index: number) =>
      index < page.currentPage * page.size &&
      index >= page.size * (page.currentPage - 1)
  );
};
//改变页码
const handleCurrentChange = (e: number) => {
  page.currentPage = e;
};
//改变页数限制
const handleSizeChange = (e: number) => {
  page.size = e;
};

//选择人员列表 树形控件
const props: CascaderProps = {
  multiple: true,
  lazy: false,
};
// 添加活动人员
const dialogVisible = ref(false);
const selectedValues = ref<any[]>([]);
interface Option {
  value: number;
  label: string;
  children: op[];
}
interface op {
  value: number;
  label: string;
}

// 用于渲染 树形控件的 数组
let options = ref<Option[]>([]);
// 存储选中的人员ID 请求用
const selectedEmployees = ref<number[]>([]);
const selectedDepartments = ref<number[]>([1, 2, 3, 4]); // 假设你有这个变量用于保存部门ID
// 树形控件 处理数据
const handleCascaderChange = (values: any) => {
  selectedEmployees.value = []; // 清空已选人员ID
  selectedDepartments.value = []; // 假设你有这个变量用于保存部门ID
  values.forEach((item: any) => {
    const [parentId, childId] = item as number[];
    if (childId === undefined) {
      // 如果只有 parentId 被选中（即整个一级被选中）
      const department = options.value.find((dep) => dep.value === parentId);
      if (department && department.children) {
        department.children.forEach((child) => {
          selectedEmployees.value.push(child.value); // 收集所有子节点
        });
      }
      selectedDepartments.value.push(parentId); // 可选：记录选中的部门
    } else {
      // 如果是具体子项被选中
      selectedEmployees.value.push(childId);
    }
  });
  // 去重处理，避免重复添加
  selectedEmployees.value = [...new Set(selectedEmployees.value)];
  console.log(selectedEmployees.value);
};

//部门加成员列表
const departMemberList = ref<departmentMemberList[]>([]);
const fetchDepartmentData = async () => {
  // 获取部门列表
  const depListRes = await getDepList();
  if (depListRes.data) {
    departMemberList.value = depListRes.data;
  }
  // 并行请求所有部门的成员列表
  await Promise.all(
    departMemberList.value.map(async (item) => {
      const memberRes = await getDepMemberList(item.id);
      if (memberRes.data) {
        item.members = memberRes.data;
      }
    })
  );
  // 此时 departMemberList 已完全填充，可以安全地映射到 options
  options.value = departMemberList.value.map((item) => ({
    value: item.id,
    label: item.name,
    children:
      item.members?.map((member) => ({
        value: member.id,
        label: member.username,
      })) || [],
  }));
};
//打开对话框
const handleAddClick = async () => {
  dialogVisible.value = true;
  await fetchDepartmentData();
};
const AddMember = async () => {
  // 在这里处理添加成员的逻辑
  let data = {
    activityId: activityId.value,
    userId: selectedEmployees.value,
  };
  const res = await addMember(data);
  console.log(res);

  if (res.code === 200) {
    ElMessage({
      message: "添加成功！",
      type: "success",
    });
    update();
  } else {
    ElMessage({
      message: "添加失败！",
      type: "error",
    });
  }
  handleClose();
};

const handleClose = () => {
  dialogVisible.value = false;
  selectedValues.value = [];
};

const delPeople = async (userId: number) => {
  const usersId = ref<number[]>([]);
  usersId.value.push(Number(userId));
  const res = await delMember(store.activityId, usersId.value);
  if (res.code === 200) {
    ElMessage({
      message: "删除成功！",
      type: "success",
    });
    update();
  } else {
    ElMessage({
      message: "删除失败！",
      type: "error",
    });
  }
};
</script>
<template>
  <el-card style="width: 100%; height: 100%" shadow="never">
    <template #header>
      <div class="card-header">
        <el-button type="primary" @click="handleAddClick">添加</el-button>
        <el-button>导入</el-button>
      </div>
    </template>
    <el-table
      ref="multipleTableRef"
      :data="tableData()"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" />
      <el-table-column prop="userName" label="姓名" />
      <el-table-column prop="userId" label="学号" />
      <el-table-column prop="departmentName" label="部门" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-popconfirm
            title="确定删除该成员?"
            @confirm="delPeople(scope.row.userId)"
          >
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
            <template #actions="{ confirm, cancel }">
              <el-button size="small" @click="cancel">取消</el-button>
              <el-button type="danger" size="small" @click="confirm">
                确定
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="prev, pager, next, total"
        :total="page.total"
      />
    </template>
  </el-card>
  <el-dialog
    title="添加活动人员"
    v-model="dialogVisible"
    width="550px"
    style="padding: 30px"
  >
    <el-form-item label-position="top" style="margin-top: 20px" width="400px">
      <el-cascader
        v-model="selectedValues"
        :options="options"
        collapse-tags
        collapse-tags-tooltip
        clearable
        :props="props"
        placeholder="请选择参与对象"
        @change="handleCascaderChange"
        style="width: 60%"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClose()">取消</el-button>
      <el-button type="primary" plain @click="AddMember">确定添加</el-button>
    </el-form-item>
  </el-dialog>
</template>
<style scoped></style>
