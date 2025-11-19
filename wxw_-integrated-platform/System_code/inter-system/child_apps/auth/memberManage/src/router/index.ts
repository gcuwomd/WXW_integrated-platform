import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { menuprop } from "../type/response-data";
import { routeStore } from "../store/route";
import { storeToRefs } from "pinia";

const routes: RouteRecordRaw[] = [
  {
    name: "权限",
    path: "/",
    meta: {
      title: "权限系统",
    },
    children: [],
  },
  // {
  //   path: "/",
  //   redirect: "/evaluate",
  // },
  // {
  //   path: "/member",
  //   name: "成员信息",
  //   component: () => import("../views/Member.vue"),
  // },
  // {
  //   path: "/detail",
  //   name: "评价详情",
  //   component: () => import("../views/EvaluateDetail.vue"),
  // },
  // {
  //   path: "/role",
  //   name: "权限管理",
  //   component: () => import("../views/Role.vue"),
  //   children: [
  //     {
  //       path: "PermissionGroup",
  //       name: "权限组",
  //       component: () => import("../views/role/PermissionGroup.vue"),
  //     },
  //     {
  //       path: "Permission",
  //       name: "权限",
  //       component: () => import("../views/role/Permission.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/activity",
  //   name: "活动管理",
  //   component: () => import("../views/Activity.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//路由守卫
// @ts-ignore
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  if (routes[0].children?.length == 0) {
    getroute();
    next("/evaluate");
  }else{
    next()
  }
  
});

//动态路由渲染
export const getroute = async () => {
  const useMenu = routeStore();
  const { menuList } = storeToRefs(useMenu);
  
  // 匹配一级路由组件
  const modules = import.meta.glob("../views/**.vue");
  // 匹配二级路由组件
  const moduleschile = import.meta.glob("../views/**/**.vue");
  // 新增：匹配三级路由组件
  const modulesGrandChild = import.meta.glob("../views/**/**/**.vue");

  menuList.value.forEach((menu: menuprop) => {
    for (const path in modules) {
      let component = path.match(/(?<=\/)[^/]+(?=\.vue)/);
      if (component && menu.component === component[0]) {
        let route: any = {
          path: menu.path,
          component: modules[path],
          name: menu.name,
          meta: menu.meta,
          children: [],
        };

        // 处理二级路由
        menu.children?.forEach((child: any) => {
          for (const path in moduleschile) {
            let chilcomponent = path.match(/\/[^\/]+\/([^\/]+)\.vue$/);
            if (chilcomponent && child.path === chilcomponent[1]) {
              let childroute: any = {
                path: child.path,
                component: moduleschile[path],
                name: child.name,
                meta: child.meta,
                children: [],
              };

              // 处理三级路由
              child.children?.forEach((grandChild: any) => {
                for (const grandPath in modulesGrandChild) {
                  let grandChilcomponent = grandPath.match(/\/[^\/]+\/[^\/]+\/([^\/]+)\.vue$/);
                  if (grandChilcomponent && grandChild.path === grandChilcomponent[1]) {
                    let grandChildRoute: any = {
                      path: grandChild.path,
                      component: modulesGrandChild[grandPath],
                      name: grandChild.name,
                      meta: grandChild.meta,
                    };
                    childroute.children.push(grandChildRoute);
                  }
                }
              });

              route.children.push(childroute);
            }
          }
        });

        let parentRoute = router.getRoutes().find((route) => route.path === "/");
        if (parentRoute) {
          if (!parentRoute.children) {
            parentRoute.children = [];
          }
          parentRoute.children.push(route);
        }
        router.addRoute("权限", route);
      }
    }
  });
};

export default router;
