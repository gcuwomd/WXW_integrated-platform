import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import UnoCSS from "unocss/vite";
// import { join } from "path";
// import { writeFileSync } from "fs";

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  // base: `${
  //   process.env.NODE_ENV === "production" ? "http://43.139.169.119:3640" : ""
  // }`,
  resolve: {
    alias: {
      "@": pathSrc,
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
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
    UnoCSS(),
  ],
  build: {
    outDir: path.resolve(__dirname, "dist"),
  },
});
