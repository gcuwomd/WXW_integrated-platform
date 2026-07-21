<!-- 权限 -->
<template>
  <el-card>
    <div class="flex align-center justify-start">
      <el-button
        type="primary"
        plain
        style="justify-self: end"
        @click="
          {
            opendialog();
            ruleStatus = 'add'; //设置为编辑状态
          }
        "
        >添加评分规则</el-button
      >
    </div>
    <div>
      <el-table style="width: 100%" :data="ruleslist" stripe>
        <el-table-column fixed prop="indicatorsId" label="评分规则序号" />
        <el-table-column
          prop="indicatorsName"
          label="评分规则名称"
          width="500"
        />
        <el-table-column label="具体评分细则条目" prop="elements">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="
                {
                  opendrawer(scope.row.elements);
                  ruleStatus = 'edit'; //设置为编辑状态
                  AddorEditrulesform.indicatorsId = scope.row.indicatorsId; //传入id
                  AddorEditrulesform.indicatorsName = scope.row.indicatorsName; //传入名称
                  delindicatorsId = scope.row.indicatorsId; //传入id
                }
              "
              >细则详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="elements">
          <template #default="scope">
            <el-button
              link
              @click="
                {
                  delholeRules();
                  delindicatorsId = scope.row.indicatorsId; //传入id
                  delindicatorsElements = [];
                }
              "
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <el-drawer
    v-model="drawer"
    title="具体细则管理"
    direction="rtl"
    size="50%"
    style="display: flex; flex-direction: column"
  >
    <el-button
      type="primary"
      style="justify-content: flex-end; margin-bottom: 20px"
      @click="sondrawer = true"
      >添加细则</el-button
    >
    <el-button
      type="danger"
      style="justify-content: flex-end; margin-bottom: 20px"
      @click="delelements()"
      >删除细则</el-button
    >
    <el-table
      :data="AddorEditrulesform.elements"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="elementsId" label="id" width="100">
        <template #default="scope">
          <span
            :class="{
              evaluated: scope.row.elementsId !== null,
              'not-evaluated': scope.row.elementsId === null,
            }"
          >
            {{ scope.row.elementsId !== null ? scope.row.elementsId : "暂无" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="elementsName" label="名称" width="120" />
      <el-table-column prop="content" label="描述" width="150" />
      <el-table-column prop="standardScore" label="评价分数">
        <template #default="scope">
          <el-input-number
            placeholder="分数"
            v-model="scope.row.standardScore"
            :min="1"
            :max="10"
          />
        </template>
      </el-table-column>
    </el-table>
    <div
      class="demo-drawer__footer"
      style="position: absolute; left: 20px; bottom: 20px"
    >
      <el-button type="primary" @click="handleClose"> 保存 </el-button>
      <el-button @click="drawer = false">取消</el-button>
    </div>
  </el-drawer>
  <el-drawer
    v-model="sondrawer"
    title="添加细则"
    direction="rtl"
    size="30%"
    style="display: flex; flex-direction: column"
  >
    <p style="margin-bottom: 50px">请注意，活动总分为10分！！</p>
    <el-form :model="rulesform">
      <el-form-item label="细则名称"
        ><el-input v-model="rulesform.elementsName"></el-input
      ></el-form-item>
      <el-form-item label="细则内容"
        ><el-input v-model="rulesform.content"></el-input
      ></el-form-item>
      <el-form-item label="细则分值"
        ><el-input-number
          placeholder="分数"
          v-model="rulesform.standardScore"
          :min="1"
          :max="10" /></el-form-item
    ></el-form>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="sondrawer = false">取消</el-button>
  </el-drawer>
  <el-dialog
    v-model="dialog"
    title="评分名称"
    width="500"
    style="padding: 35px"
  >
    <el-input
      v-model="AddorEditrulesform.indicatorsName"
      style="width: 300px"
      placeholder="请输入评分名称，例：招新活动评分规则"
    />
    <template #footer>
      <div class="dialog-footer" style="display: flex; justify-content: center">
        <el-button @click="dialog = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            {
              dialog = false;
              opendrawer([]); //保存后打开drawer 设置细则 传入空数组作为初始值
            }
          "
        >
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getRules,
  addRules,
  editRules,
  delRules,
  // getRulesByact,
} from "../../api/methods/rules/rules";
import { elements, indicatorslist } from "../../type/response-data";
import { ElMessage, ElMessageBox } from "element-plus";
const sondrawer = ref(false);
const dialog = ref(false);
const ruleStatus = ref<string>(""); //add // edit

//  评分规则列表
const ruleslist = ref<indicatorslist[]>([]);
//添加细则 修改细则
const AddorEditrulesform = ref<indicatorslist>({
  indicatorsId: null,
  indicatorsName: "",
  elements: [],
});

onMounted(async () => {
  //获取细则列表
  await GetRules();
});

const GetRules = async () => {
  //获取细则列表
  await getRules(0).then((res) => {
    ruleslist.value = res.data;
  });
};

// 具体细则管理 - 抽屉
const drawer = ref(false);
const opendrawer = (initaldata: elements[]) => {
  //将elements 数组 传给 rulestable
  if (initaldata) {
    AddorEditrulesform.value.elements = initaldata;
  }
  drawer.value = true;
};
const handleClose = () => {
  // 计算所有 standardScore 的总和
  const totalScore = AddorEditrulesform.value.elements.reduce((sum, item) => {
    return sum + Number(item.standardScore);
  }, 0);
  // 检查总和是否为10
  if (totalScore !== 10) {
    ElMessage({
      type: "warning",
      message: `总分须为10分，当前总分为${totalScore}`,
    });
    return; // 直接返回，不执行后续操作
  }
  // 如果验证通过，继续执行确认对话框
  ElMessageBox.confirm("确定保存修改?", "注意", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // 通过一个 status 来判断 添加还是修改
      console.log(AddorEditrulesform.value);
      if (ruleStatus.value === "add") {
        //添加
        await addRules(AddorEditrulesform.value).then(async (res) => {
          if (res.code === 200) {
            ElMessage({
              type: "success",
              message: "添加评分规则成功",
            });
            AddorEditrulesform.value = {
              indicatorsId: null,
              indicatorsName: "",
              elements: [],
            };
            //重新获取
            await GetRules();
          }
        });
      } else if (
        ruleStatus.value === "edit" &&
        AddorEditrulesform.value.indicatorsId != null
      ) {
        AddorEditrulesform.value.elements.forEach((item: any) => {
          item.indicatorsId = AddorEditrulesform.value.indicatorsId;
        });
        await editRules(AddorEditrulesform.value).then(async (res) => {
          if (res.code === 200) {
            ElMessage({
              type: "success",
              message: "修改评分规则成功",
            });
            AddorEditrulesform.value = {
              indicatorsId: null,
              indicatorsName: "",
              elements: [],
            };
            await GetRules();
          }
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "保存失败",
      });
    });

  drawer.value = false;
};
//细则添加
const rulesform = ref<elements>({
  elementsName: "",
  content: "",
  standardScore: 0,
});

const submitForm = () => {
  ElMessageBox.confirm("确定提交？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      AddorEditrulesform.value.elements.push(rulesform.value);
      // // 直接请求
      // const olddata = AddorEditrulesform.value.elements.map((item: any) => {
      //   return {
      //     elementsName: item.elementsName,
      //     content: item.content,
      //     standardScore: item.standardScore,
      //   };
      // });
      // // 合并新的 还有旧的细则
      // let data = {
      //   indicatorsName: AddorEditrulesform.value.indicatorsName,
      //   elements: [rulesform.value].concat(olddata),
      // };
      // console.log(data);
      // await addRules(data).then((res) => {
      //   if (res.code === 200) {
      //     ElMessage({
      //       type: "success",
      //       message: "添加评分规则成功",
      //     });
      //     AddorEditrulesform.value = {
      //       indicatorsId: null,
      //       indicatorsName: "",
      //       elements: [],
      //     };
      //   } else {
      //     ElMessage({
      //       type: "error",
      //       message: "添加评分规则失败",
      //     });
      //   }
      // });
      rulesform.value = {
        elementsName: "",
        content: "",
        standardScore: 0,
      };
      // 将值传入后 清空处理
      sondrawer.value = false;
    })
    .catch(() => {
      ElMessage({});
    });
};

//评分添加 对话框 设置评分名称 ——> 打开 drawer 添加评分细则
const opendialog = () => {
  dialog.value = true;
};

// ---------------------------------------------------------------------
// 细则多选处理   进行批量删除操作
const handleSelectionChange = (val: elements[]) => {
  delindicatorsElements.value = val.map((item) => Number(item.elementsId));
};
//评分id 暂存
const delindicatorsId = ref<number>(0);
//评分细则 数组 暂存
const delindicatorsElements = ref<number[]>([]);

// 删除子细则
const delelements = async () => {
  if (delindicatorsElements.value.length === 0) {
    ElMessage.warning("请选择要删除的细则");
  } else {
    ElMessageBox.confirm("确定进行删除？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await delindicators();
      })
      .catch(() => {
        ElMessage({});
      });
  }
};
// 删除整套评分规则
const delholeRules = () => {
  ElMessageBox.confirm("确定删除该评分规则？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await delindicators();
    })
    .catch(() => {
      ElMessage({});
    });
};

// 请求函数 删除  包括整个 或者 部分
const delindicators = async () => {
  await delRules({
    indicatorsId: delindicatorsId.value,
    elementsId: delindicatorsElements.value,
  }).then(async (res) => {
    if (res.code === 200) {
      ElMessage.success("删除成功");
      await GetRules();
    }
  });
};
</script>

<style scoped>
.el-dialog__body {
  margin-bottom: 100px !important;
}
</style>
