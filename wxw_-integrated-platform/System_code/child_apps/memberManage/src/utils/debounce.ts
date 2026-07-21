// 导入防抖函数
const debounce = (fn: Function, delay: number = 500) => {
  let timer: NodeJS.Timeout | null = null;
  let isFirstClick = true; // 判断是否为首次点击
  return (...args: any[]) => {
    if (isFirstClick) {
      isFirstClick = false;
      fn(...args); // 首次点击直接执行函数
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
        isFirstClick = true; // 执行延迟后恢复首次点击状态
      }, delay);
    }
  };
};

// 创建一个带有防抖功能的函数来显示消息
export const debouncedShowMessage = debounce(
  (message: string, type: "success" | "warning" | "info" | "error") => {
    ElMessage({
      message,
      type,
    });
  },
  1000
);
