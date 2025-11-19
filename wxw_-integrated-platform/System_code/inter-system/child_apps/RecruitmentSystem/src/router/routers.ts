// import { storeToRefs } from "pinia";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import { menuprop } from "../type/response-data";
import { routeStore } from "../store/route";
import { storeToRefs } from "pinia";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    name: "招新",
    meta: {
      title: "招新系统",
    },
    children: [
      // {
      //   name: "人数统计",
      //   path: "ReviewSituation",
      //   component: () => import("../views/ReviewSituation.vue"), // 确保引入对应的组件
      //   meta: {
      //     title: "人数统计",
      //   },
      //   children: [
      //     {
      //       name: "饼状图",
      //       component: () => import("../views/ReviewSituation/Fan.vue"), // 引入饼状图组件
      //       path: "Fan",
      //       meta: {
      //         title: "饼状图",
      //       },
      //       children: [],
      //     },
      //     {
      //       name: "直方图",
      //       component: () => import("../views/ReviewSituation/Histogram.vue"), // 引入直方图组件
      //       path: "Histogram",
      //       meta: {
      //         title: "直方图",
      //       },
      //       children: [],
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//路由守卫
//@ts-ignore
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  if (routes[0].children?.length == 0) {
    getroute();
    next("/ReviewSituation/Fan");
  }
  next();
});

//动态路由渲染
export const getroute = async () => {
  // 存储在 store 中
  const useMenu = routeStore();
  const { menuList } = storeToRefs(useMenu);
  const modules = import.meta.glob("../views/**.vue"); //匹配
  const moduleschile = import.meta.glob("../views/**/**.vue"); //匹配二级路由
  menuList.value.forEach((menu: menuprop) => {
    for (const path in modules) {
      let component = path.match(/(?<=\/)[^/]+(?=\.vue)/);
      if (component) {
        if (menu.component === component[0]) {
          let route: any = {
            path: menu.path,
            component: modules[path],
            name: menu.name,
            meta: menu.meta,
            children: [],
          };
          menu.children?.forEach((child: any) => {
            for (const path in moduleschile) {
              let chilcomponent = path.match(/\/[^\/]+\/([^\/]+)\.vue$/);
              if (chilcomponent) {
                if (child.path === chilcomponent[1]) {
                  let childroute: any = {
                    path: child.path,
                    component: moduleschile[path],
                    name: child.name,
                    meta: child.meta,
                    children: [],
                  };
                  route.children.push(childroute);
                }
              }
            }
          });
          let parentRoute = router
            .getRoutes()
            .find((route) => route.path === "/");
          if (parentRoute) {
            if (!parentRoute.children) {
              parentRoute.children = [];
            }
            parentRoute.children.push(route);
          }
          router.addRoute("招新", route);
        }
      }
    }
  });
};

export default router;
