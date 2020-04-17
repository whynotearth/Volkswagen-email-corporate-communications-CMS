import { defaultMemoFormData } from '@/store/modules/memo.js';

export default function configureModerator(store, router) {
  // listen to mutations
  store.subscribe(({ type, payload }, state) => {
    /* eslint-disable */
    switch (type) {
      case 'auth/logout':
        // return store.commit('booking/resetState');
        store.commit('memo/update_form_data', defaultMemoFormData);
    }
    /* eslint-enable */
  });
  // listen to actions
  // store.subscribeAction(({ type, payload }, state) => {
  //   switch (type) {
  //     case 'auth/logout':
  //       return router.push('/auth/signin');
  //   }
  // });
}
