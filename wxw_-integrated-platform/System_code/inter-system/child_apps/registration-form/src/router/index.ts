import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    // '/' 表示本目录为根目录，根目录是路由启动时跳转的页面
    path: '/',
    component: () => import('../views/RegistrationForm.vue'),
  },
  {
    path: '/welcome',
    component: () => import('../views/Welcome.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
});
export default router