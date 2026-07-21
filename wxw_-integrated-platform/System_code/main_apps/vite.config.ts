import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173, // 主应用端口
    proxy: {
      // 将所有 /api 开头的请求代理到后端网关
      '/api': {
        target: 'https://nc-wxwjcwg.gcu.edu.cn', // 后端网关地址
        changeOrigin: true,
        secure: false, // 如果后端是 HTTPS 且证书自签名，设为 false
        // rewrite: (path) => path.replace(/^\/api/, ''), // 如果需要去掉 /api 前缀则取消注释
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      dts: "./auto-imports.d.ts",
      resolvers: [ElementPlusResolver()],
      imports: [
        {
          alova: ["useRequest"],
        },
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    UnoCSS(),
  ],
});
