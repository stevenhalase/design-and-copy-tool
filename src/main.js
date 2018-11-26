import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './registerServiceWorker';
import VueTimeago from 'vue-timeago';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas);
library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
