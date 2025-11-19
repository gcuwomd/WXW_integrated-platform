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
  base: `${
    process.env.NODE_ENV === "production" ? "http://10.132.241:3638" : ""
  }`,
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [
    vue(),
    // (function () {
    //   let basePath = "";
    //   return {
    //     name: "Sign-system",
    //     apply: "build",
    //     configResolved(config: any) {
    //       basePath = `${config.base}${config.build.assetsDir}/`;
    //     },
    //     writeBundle(options: any, bundle: any) {
    //       for (const chunkName in bundle) {
    //         if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
    //           const chunk = bundle[chunkName];
    //           if (chunk.fileName && chunk.fileName.endsWith(".js")) {
    //             chunk.code = chunk.code.replace(
    //               /(from|import\()(\s*['"])(\.\.?\/)/g,
    //               // @ts-ignore
    //               (all, $1, $2, $3) => {
    //                 return all.replace($3, new URL($3, basePath));
    //               }
    //             );
    //             const fullPath = join(options.dir, chunk.fileName);
    //             writeFileSync(fullPath, chunk.code);
    //           }
    //         }
    //       }
    //     },
    //   };
    // })() as any,
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
