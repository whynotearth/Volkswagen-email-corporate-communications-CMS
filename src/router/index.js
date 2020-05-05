import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PostAdd from '../views/PostAdd.vue';
import AuthLogin from '../views/AuthLogin.vue';
import MemoAdd from '../views/MemoAdd.vue';
import Settings from '../views/Settings';
import ActivityFeedMemoList from '../views/ActivityFeedMemoList.vue';
import ActivityFeedMemoItem from '../views/ActivityFeedMemoItem.vue';
import EmailLists from '../views/EmailLists';
import EmailList from '../views/EmailList';
import EmailListAdd from '../views/EmailListAdd';
import EmailListEdit from '../views/EmailListEdit';
import EmailListItem from '../views/EmailListItem';
import EmailListImport from '../views/EmailListImport';
import EmailListImportHelp from '../views/EmailListImportHelp';
import Email from '@/views/Email';
import Dashboard from '../views/Dashboard';
import AdminPosts from '../views/admins/Posts';
import AdminPostsItem from '../views/admins/PostsItem';
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
    path: '/posts/add/:step?',
    name: 'PostAdd',
    component: PostAdd,
    props: true,
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
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/emails/add/:step?',
    name: 'EmailsAdd',
    component: Email,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists',
    name: 'EmailLists',
    component: EmailLists,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists/import',
    name: 'EmailListImport',
    component: EmailListImport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists/import-help',
    name: 'EmailListImportHelp',
    component: EmailListImportHelp,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists/:groupName',
    name: 'EmailList',
    component: EmailList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists/:groupName/add',
    name: 'EmailListAdd',
    component: EmailListAdd,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists/:groupName/:id/edit',
    name: 'EmailListEdit',
    component: EmailListEdit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/email-lists/:groupName/:id',
    name: 'EmailListItem',
    component: EmailListItem,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/posts',
    name: 'AdminPosts',
    component: AdminPosts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/posts/:id',
    name: 'AdminPostsItem',
    component: AdminPostsItem,
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
  // needsUserInfo IS DEPRECATED
  // TODO: REMOVE
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

  // DEPRECATED
  // TODO: REMOVE
  if (to.meta.needsUserInfo) {
    // wait for user info, then go to route
    next();
  }
});

export default router;
