/// <reference types="vite/client" />

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
