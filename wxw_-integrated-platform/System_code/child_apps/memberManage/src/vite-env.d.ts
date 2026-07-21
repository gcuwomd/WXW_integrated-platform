/// <reference types="vite/client" />

declare module '@jamescoyle/vue-icon' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module 'nprogress'

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

// micro-app 类型声明
declare global {
  interface Window {
    microApp: {
      dispatch: (data: any) => void;
      getData: () => any;
      setData: (name: string, data: any) => void;
      addDataListener: (name: string, listener: (data: any) => void) => void;
    };
  }
}

export {};