import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PostAdd from '../views/PostAdd.vue';
import AuthLogin from '../views/AuthLogin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin
  },
  {
    path: '/posts/add',
    name: 'PostAdd',
    component: PostAdd
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
