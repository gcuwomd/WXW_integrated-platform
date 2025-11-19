<template>
  <div>
    <h2>各部门职能</h2>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      stretch
    >
      <el-tab-pane name="xzms"
        ><template #label><h2>行政秘书部</h2></template>
        <h4>行政秘书部</h4>
        <div>
          <ul>
            <li>
              协助常委会制定各种规章制度、拟定各类文件性通知（包括内部通
              知及大型活动正式通知）。负责委员会各类文件性资料的发放、整
              理、归档、保管及管理委员会内部成员档案
            </li>
            <li>
              负责委员会文秘工作，包括各类活动的通知、会议签到、会议主
              持，做好相关会议记录及会议摘要，对成员的出勤情况进行跟踪
            </li>
            <li>
              提高学信委全体成员的办事效率、规范化办事流程、统一公文格式 等
            </li>
            <li>
              管理委员会的微信群及信息管理平台，及时对内部通讯录、工作日
              历进行更新
            </li>
            <li>
              负责微信公众号平台和微博等自媒体的管理和发布工作，宣传有关
              网络与信息服务的各类政策，及时报道我校信息空间各类资讯，为校
              园网用户提供及时的信息
            </li>
            <li>负责统筹招新工作</li>
            <li>
              挖掘和培养管理、新媒体等专业类型的工作人才，以便于更好地协助委员会开展团队管理和宣传等方面的工作
            </li>
            <li>
              负责编写网络与信息工作委员会活动的相关策划书，负责对网信委
              的大型活动的策划、组织和筹备工作，开展实践活动，负责活动的总结
            </li>
            <li>
              统筹开展面向全校师生的与信息系统开发、信息安全相关的各类比赛
            </li>
            <li>负责组织开展对各职能部门成员的定期考核</li>
          </ul>
        </div></el-tab-pane
      ><el-tab-pane name="wlyw">
        <template #label><h2>网络运维部</h2></template>
        <h4>网络运维部</h4>
        <div>
          <ul>
            <li>
              负责学生宿舍网络的现场支持服务，及时响应各类网络服务需求，
              协助校园网运维团队解决网络故障，提升服务质量，配合校园网运维
              团队将信息传达到用户
            </li>
            <li>
              负责“华广校园网”微信公众号与智慧校园运维团队的后台回复工
              作，收集微信公众号后台数据并分析结果，引导学生利用公众号了解
              校园网和自主申报网络故障，解决遇到的问题，及时反馈师生的建议
              并给予答复
            </li>
            <li>
              负责开展用户体验和满意度调查，收集师生对校园网使用的各类意
              见和建议，分析调查问卷并撰写研究报告，组织召开调查报告会，促
              进相关方达成改进措施并监督落实情况
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane name="wzyw"
        ><template #label><h2>网站运维部</h2></template>
        <h4>网站运维部</h4>
        <div>
          <ul>
            <li>
              负责学校网站安全，按期进行校内网站安全检查，及时做好检查后
              的各项记录，网站如有入侵则及时上报，协助处理，确保一个良好的
              校园网络环境
            </li>
            <li>
              负责校园网站的运维，建设和优化，为“华广校园网”微信公众号
              提供技术支持，确保校园网站，“华广校园网”微信公众号的正常运 行
            </li>
            <li>
              开展网站建设，安全管理和运行维护安全讲座以及技术培训，保证
              部门成员能够胜任岗位工作，为校园网络保驾护航
            </li>
          </ul>
        </div></el-tab-pane
      >
      <el-tab-pane name="xxhyw">
        <template #label><h2>信息化运维部</h2></template>
        <h4>信息化运维部</h4>
        <div>
          <ul>
            <li>
              负责对智慧校园平台进行宣传推广，同时负责需求调研，活动组织 等
            </li>
            <li>负责对智慧校园平台进行日常维护的工作和平台与应用的功能测 试</li>
            <li>负责为智慧校园平台开发轻应用和技术支持</li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("xzms");
import type { TabsPaneContext } from "element-plus";
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style scoped>
li {
  margin-bottom: 20px;
}
</style>
