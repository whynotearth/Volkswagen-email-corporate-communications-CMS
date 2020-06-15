export default function configureModerator(store, router) {
  // listen to mutations
  store.subscribe(({ type, payload }, state) => {
    /* eslint-disable */
    switch (type) {
      case 'auth/logout':
        // return store.commit('booking/resetState');
        store.dispatch('memo/clear_form_data');
        store.dispatch('article/clear_form_data');
        store.dispatch('authKeep/clear');
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
