// vite.config.ts
import { defineConfig } from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/Integration-Platform/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/Integration-Platform/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/Integration-Platform/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/Integration-Platform/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/Integration-Platform/node_modules/unplugin-vue-components/dist/resolvers.js";
import UnoCSS from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/Integration-Platform/node_modules/unocss/dist/vite.mjs";
var vite_config_default = defineConfig({
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjEzMlxcXFxEZXNrdG9wXFxcXFx1N0Y1MVx1N0FEOVxcXFwxXHU3RjUxXHU3QUQ5XHU0RUUzXHU3ODAxXHU2NTg3XHU0RUY2XHU1OTM5XFxcXDFcdTdGNTFcdTRGRTFcdTU5RDRcdTVFNzNcdTUzRjBcXFxcSW50ZXJncmF0aW9uUGxhdGZvcm1cXFxcSW50ZWdyYXRpb24tUGxhdGZvcm1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDg2MTMyXFxcXERlc2t0b3BcXFxcXHU3RjUxXHU3QUQ5XFxcXDFcdTdGNTFcdTdBRDlcdTRFRTNcdTc4MDFcdTY1ODdcdTRFRjZcdTU5MzlcXFxcMVx1N0Y1MVx1NEZFMVx1NTlENFx1NUU3M1x1NTNGMFxcXFxJbnRlcmdyYXRpb25QbGF0Zm9ybVxcXFxJbnRlZ3JhdGlvbi1QbGF0Zm9ybVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvODYxMzIvRGVza3RvcC8lRTclQkQlOTElRTclQUIlOTkvMSVFNyVCRCU5MSVFNyVBQiU5OSVFNCVCQiVBMyVFNyVBMCU4MSVFNiU5NiU4NyVFNCVCQiVCNiVFNSVBNCVCOS8xJUU3JUJEJTkxJUU0JUJGJUExJUU1JUE3JTk0JUU1JUI5JUIzJUU1JThGJUIwL0ludGVyZ3JhdGlvblBsYXRmb3JtL0ludGVncmF0aW9uLVBsYXRmb3JtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGR0czogXCIuL2F1dG8taW1wb3J0cy5kLnRzXCIsXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICB7XG4gICAgICAgICAgYWxvdmE6IFtcInVzZVJlcXVlc3RcIl0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBVbm9DU1MoKSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2aUIsU0FBUyxvQkFBb0I7QUFDMWtCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLFlBQVk7QUFHbkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDakMsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLE9BQU8sQ0FBQyxZQUFZO0FBQUEsUUFDdEI7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
