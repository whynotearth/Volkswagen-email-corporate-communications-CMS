import Vue from 'vue';
import VueRouter from 'vue-router';
// import DeveloperTesting from '../views/DeveloperTesting.vue';
import ArticleAdd from '../views/ArticleAdd.vue';
import AuthLogin from '../views/AuthLogin.vue';
import MemoAdd from '../views/MemoAdd.vue';
import Settings from '../views/Settings';
import BlueDeltaSettings from '../views/BlueDeltaSettings';
import MyAccount from '../views/MyAccount';
import ChangePassword from '../views/MyAccountChangePassword';
import Stats from '../views/Stats.vue';
import StatsOverviewMemos from '../views/StatsOverviewMemos.vue';
import StatsOverviewJumpstarts from '../views/StatsOverviewJumpstarts.vue';
// import StatsOverviewJumpstart from '../views/StatsOverviewJumpstart.vue';
import MemoListActivity from '../views/MemoListActivity.vue';
import MemoActivityDetail from '../views/MemoActivityDetail.vue';
import EmailLists from '../views/EmailLists';
import EmailList from '../views/EmailList';
import EmailListAdd from '../views/EmailListAdd';
import EmailListEdit from '../views/EmailListEdit';
import EmailListItem from '../views/EmailListItem';
import EmailListImport from '../views/EmailListImport';
import EmailListImportHelp from '../views/EmailListImportHelp';
import Email from '@/views/Email';
import Dashboard from '../views/Dashboard';
import BlueDeltaMain from '@/views/BlueDeltaMain';
import JumpStartLists from '../views/JumpStartLists';
import ArticleMain from '../views/ArticleMain';
import ArticleLists from '../views/ArticleLists';
import ArticleListsItem from '../views/ArticleListsItem';
import EditBlueDelta from '../views/EditBlueDelta';
import BlueDeltaRearrange from '../views/BlueDeltaRearrange';
// import DeveloperTesting from '../views/DeveloperTesting.vue';
import AuthForgotPassword from '../views/AuthForgotPassword';
import AuthNewPassword from '../views/AuthNewPassword';
import JumpStartActivityList from '../views/JumpStartActivityList.vue';
import JumpStartActivityDetail from '../views/JumpStartActivityDetail.vue';
import ArticleCategorySelection from '../views/ArticleCategorySelection.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/test',
  //   name: 'DeveloperTesting',
  //   component: DeveloperTesting
  // },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/forgot-password',
    name: 'AuthForgotPassword',
    component: AuthForgotPassword,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/new-password',
    name: 'AuthNewPassword',
    component: AuthNewPassword,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/articles',
    name: 'ArticleMain',
    component: ArticleMain
  },
  {
    path: '/articles/add/:step?',
    name: 'ArticleAdd',
    component: ArticleAdd,
    props: true
  },
  {
    path: '/articles/category-selection',
    name: 'ArticleCategorySelection',
    component: ArticleCategorySelection
  },
  {
    path: '/memo/add/:step?',
    name: 'MemoAdd',
    component: MemoAdd,
    props: true
  },

  {
    path: '/blue-delta',
    name: 'BlueDeltaMain',
    component: BlueDeltaMain
  },
  {
    path: '/stats/memos',
    name: 'StatsOverviewMemos',
    component: StatsOverviewMemos
  },
  {
    path: '/stats/memos/activity',
    name: 'MemoListActivity',
    component: MemoListActivity
  },
  {
    path: '/stats/memos/activity/:id',
    name: 'MemoActivityDetail',
    component: MemoActivityDetail,
    props: true
  },
  {
    path: '/emails/add/:step?',
    name: 'EmailsAdd',
    component: Email,
    props: true
  },
  {
    path: '/blue-delta/edit/:id',
    name: 'EditBlueDelta',
    component: EditBlueDelta,
    props: true
  },
  {
    path: '/blue-delta/add/:date',
    name: 'AddBlueDelta',
    component: EditBlueDelta,
    props: true
  },
  {
    path: '/blue-delta/rearrange/:id',
    name: 'BlueDeltaRearrange',
    component: BlueDeltaRearrange,
    props: true
  },
  {
    path: '/blue-delta/rearrange/add/:date',
    name: 'AddBlueDeltaRearrange',
    component: BlueDeltaRearrange,
    props: true
  },
  {
    path: '/blue-delta/list',
    name: 'JumpStartLists',
    component: JumpStartLists
  },
  {
    path: '/article-lists',
    name: 'ArticleLists',
    component: ArticleLists
  },
  {
    path: '/article-lists/:id',
    name: 'ArticleListsItem',
    component: ArticleListsItem
  },
  {
    path: '/stats/jumpstarts',
    name: 'StatsOverviewJumpstarts',
    component: StatsOverviewJumpstarts
  },
  {
    path: '/stats/jumpstarts/activity',
    name: 'JumpStartActivityList',
    component: JumpStartActivityList
  },
  {
    path: '/stats/jumpstarts/activity/:id',
    name: 'JumpStartActivityDetail',
    component: JumpStartActivityDetail,
    props: true
  },

  // settings
  // -----------------------
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/settings/blue-delta',
    name: 'BlueDeltaSettings',
    component: BlueDeltaSettings
  },
  {
    path: '/settings/my-account',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/settings/my-account/change-password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/settings/email-lists',
    name: 'EmailLists',
    component: EmailLists
  },
  {
    path: '/settings/email-lists/import',
    name: 'EmailListImport',
    component: EmailListImport
  },
  {
    path: '/settings/email-lists/import-help',
    name: 'EmailListImportHelp',
    component: EmailListImportHelp
  },
  {
    path: '/settings/email-lists/:groupName',
    name: 'EmailList',
    component: EmailList
  },
  {
    path: '/settings/email-lists/:groupName/add',
    name: 'EmailListAdd',
    component: EmailListAdd
  },
  {
    path: '/settings/email-lists/:groupName/:id/edit',
    name: 'EmailListEdit',
    component: EmailListEdit
  },
  {
    path: '/settings/email-lists/:groupName/:id',
    name: 'EmailListItem',
    component: EmailListItem
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next();

  if (!to.meta.isPublic) {
    const pingPromise = store.dispatch('auth/ping');
    pingPromise.then(result => {
      if (result === 'IS_LOGGED_OUT') {
        router.push({ name: 'AuthLogin' }).then(() => {
          setTimeout(function() {
            window.location.reload();
          });
        });
      }
    });
  }
});

export default router;
