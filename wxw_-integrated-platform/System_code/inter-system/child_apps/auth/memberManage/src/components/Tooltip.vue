<template>
    <el-tooltip
      effect="dark"
      :content="text"
      :disabled="isShowTooltip"
      placement="top"
    >
      <div
        class="outer"
        :style="style"
        @mouseover="onMouseOver()"
      >
        <span ref="innerText">
          {{ content }}
        </span>
      </div>
    </el-tooltip>
</template>
  
<script setup lang="ts">
    import { ref, watchEffect } from 'vue'
    const props = defineProps({
      text: {
        type: String,
        default: ''
      },
      style: {
        type: Object,
        default: {}
      }
    })
  
    const { text, style } = props
    const innerText = ref<any>({})
    const isShowTooltip = ref<boolean>(false)
      const onMouseOver = () => {
      const parentWidth = innerText.value.parentNode.offsetWidth // 获取元素父级可视宽度
      const contentWidth = innerText.value.offsetWidth // 获取元素可视宽度
      isShowTooltip.value = contentWidth <= parentWidth
    }
  
    const content = ref<string>('')
    watchEffect(() => {
      content.value = props.text
    })
</script>
  
<style scoped>
  .outer {
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
</style>