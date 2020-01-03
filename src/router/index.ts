import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import resourceRouter from "../views/resource-manage/resource-route";
import copyrightRouter from '../views/copyright-manage/copyright-manage-router';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [resourceRouter, copyrightRouter]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
