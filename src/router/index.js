import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PostAdd from '../views/PostAdd.vue';
import AuthLogin from '../views/AuthLogin.vue';
import MemoAdd from '../views/MemoAdd.vue';
import Settings from '../views/Settings';
import ActivityFeedMemoList from '../views/ActivityFeedMemoList.vue';
import ActivityFeedMemoItem from '../views/ActivityFeedMemoItem.vue';
import store from '../store';

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
    component: PostAdd,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/memo/add/:step?',
    name: 'MemoAdd',
    component: MemoAdd,
    props: true,
    meta: {
      requiresAuth: true,
      needsUserInfo: false
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activity-feed/memos',
    name: 'ActivityFeedMemoList',
    component: ActivityFeedMemoList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/activity-feed/memos/:id',
    name: 'ActivityFeedMemoItem',
    component: ActivityFeedMemoItem,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.needsUserInfo) {
    next();
  }

  const pingResult = await store.dispatch('auth/ping');

  if (to.meta.requiresAuth) {
    if (pingResult === 'IS_LOGGED_OUT') {
      await router.push({ name: 'Home' });
      setTimeout(function() {
        window.location.reload();
      });
    }
  }

  if (to.meta.needsUserInfo) {
    // wait for user info, then go to route
    next();
  }
});

export default router;
