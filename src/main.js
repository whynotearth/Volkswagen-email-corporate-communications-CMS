import Vue from 'vue';
import App from './App.vue';
import '@/connection/init';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import configureModerator from './store/store-moderator';

Vue.config.productionTip = false;

async function main() {
  await configureModerator(store, router);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

main();
