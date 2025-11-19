// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/SignSystem/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/SignSystem/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/SignSystem/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/SignSystem/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/SignSystem/node_modules/unplugin-vue-components/dist/resolvers.js";
import UnoCSS from "file:///C:/Users/86132/Desktop/%E7%BD%91%E7%AB%99/1%E7%BD%91%E7%AB%99%E4%BB%A3%E7%A0%81%E6%96%87%E4%BB%B6%E5%A4%B9/1%E7%BD%91%E4%BF%A1%E5%A7%94%E5%B9%B3%E5%8F%B0/IntergrationPlatform/SignSystem/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\86132\\Desktop\\\u7F51\u7AD9\\1\u7F51\u7AD9\u4EE3\u7801\u6587\u4EF6\u5939\\1\u7F51\u4FE1\u59D4\u5E73\u53F0\\IntergrationPlatform\\SignSystem";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": pathSrc
    }
  },
  plugins: [
    vue(),
    AutoImport({
      dts: "./auto-imports.d.ts",
      resolvers: [ElementPlusResolver()],
      imports: [
        {
          alova: ["useRequest"]
        }
      ]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, "components.d.ts")
    }),
    UnoCSS()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjEzMlxcXFxEZXNrdG9wXFxcXFx1N0Y1MVx1N0FEOVxcXFwxXHU3RjUxXHU3QUQ5XHU0RUUzXHU3ODAxXHU2NTg3XHU0RUY2XHU1OTM5XFxcXDFcdTdGNTFcdTRGRTFcdTU5RDRcdTVFNzNcdTUzRjBcXFxcSW50ZXJncmF0aW9uUGxhdGZvcm1cXFxcU2lnblN5c3RlbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxMzJcXFxcRGVza3RvcFxcXFxcdTdGNTFcdTdBRDlcXFxcMVx1N0Y1MVx1N0FEOVx1NEVFM1x1NzgwMVx1NjU4N1x1NEVGNlx1NTkzOVxcXFwxXHU3RjUxXHU0RkUxXHU1OUQ0XHU1RTczXHU1M0YwXFxcXEludGVyZ3JhdGlvblBsYXRmb3JtXFxcXFNpZ25TeXN0ZW1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzg2MTMyL0Rlc2t0b3AvJUU3JUJEJTkxJUU3JUFCJTk5LzElRTclQkQlOTElRTclQUIlOTklRTQlQkIlQTMlRTclQTAlODElRTYlOTYlODclRTQlQkIlQjYlRTUlQTQlQjkvMSVFNyVCRCU5MSVFNCVCRiVBMSVFNSVBNyU5NCVFNSVCOSVCMyVFNSU4RiVCMC9JbnRlcmdyYXRpb25QbGF0Zm9ybS9TaWduU3lzdGVtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCI7XG5cbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aFNyYyxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBkdHM6IFwiLi9hdXRvLWltcG9ydHMuZC50c1wiLFxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFsb3ZhOiBbXCJ1c2VSZXF1ZXN0XCJdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCBcImNvbXBvbmVudHMuZC50c1wiKSxcbiAgICB9KSxcbiAgICBVbm9DU1MoKSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErZ0IsT0FBTyxVQUFVO0FBQ2hpQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxZQUFZO0FBTm5CLElBQU0sbUNBQW1DO0FBUXpDLElBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUU3QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ2pDLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxPQUFPLENBQUMsWUFBWTtBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDakMsS0FBSyxLQUFLLFFBQVEsU0FBUyxpQkFBaUI7QUFBQSxJQUM5QyxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
