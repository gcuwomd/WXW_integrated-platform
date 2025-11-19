// import { storeToRefs } from "pinia";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import { routeStore } from "../store/route";
import { storeToRefs } from "pinia";
import { menuprop } from "../type/response-data";

const routes: RouteRecordRaw[] = [
  {
    name: "签到",
    path: "/",
    component: Home,
    meta: {
      title: "签到系统",
    },
    children: [],
  },
  {
    path: "/",
    redirect: "/signInInfo",
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
router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  if (routes[0].children?.length == 0) {
    getroute();
    next("/signInInfo");
  }
  next();
});

//动态路由渲染
export const getroute = async () => {
  // 存储在 store 中
  const useMenu = routeStore();
  const { menuList } = storeToRefs(useMenu);
  const modules = import.meta.glob("../views/**.vue"); //匹配
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
          let parentRoute = router
            .getRoutes()
            .find((route) => route.path === "/");
          if (parentRoute) {
            if (!parentRoute.children) {
              parentRoute.children = [];
            }
            parentRoute.children.push(route);
          }
          router.addRoute("签到", route);
        }
      }
    }
  });
  console.log(routes);
};

export default router;
