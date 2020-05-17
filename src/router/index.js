import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Stats from '../views/Stats.vue';
import ArticleAdd from '../views/ArticleAdd.vue';
import AuthLogin from '../views/AuthLogin.vue';
import MemoAdd from '../views/MemoAdd.vue';
import Settings from '../views/Settings';
import BlueDeltaSettings from '../views/BlueDeltaSettings';
import MyAccount from '../views/MyAccount';
import ChangePassword from '../views/MyAccountChangePassword';
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
import JumpStartLists from '../views/JumpStartLists';
import ArticleLists from '../views/ArticleLists';
import ArticleListsItem from '../views/ArticleListsItem';
// import DeveloperTesting from '../views/DeveloperTesting.vue';
import ResetPassword from '../views/AuthResetPassword';
import NewPassword from '../views/AuthNewPassword';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    redirect: '/'
  },
  // {
  //   path: '/test',
  //   name: 'DeveloperTesting',
  //   component: DeveloperTesting
  // },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword
  },
  {
    path: '/articles/add/:step?',
    name: 'ArticleAdd',
    component: ArticleAdd,
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
    path: '/settings/blue-delta-settings',
    name: 'BlueDeltaSettings',
    component: BlueDeltaSettings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings/my-account/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
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
    path: '/blue-delta/edit/:id',
    name: 'EditBlueDelta',
    component: () => import('@/views/EditBlueDelta.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/blue-delta/rearrange/:id',
    name: 'BlueDeltaRearrange',
    component: () => import('@/views/BlueDeltaRearrange.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/jumpstart-lists',
    name: 'JumpStartLists',
    component: JumpStartLists,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/article-lists',
    name: 'ArticleLists',
    component: ArticleLists,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/article-lists/:id',
    name: 'ArticleListsItem',
    component: ArticleListsItem,
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
      await router.push({ name: 'AuthLogin' });

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
