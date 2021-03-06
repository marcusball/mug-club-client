import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueScrollTo from 'vue-scrollto';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIndustry, faBeer, faBuilding, faQuoteLeft, faCalendarAlt, faEllipsisH, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './registerServiceWorker';

import './assets/sass/main.scss';

library.add(faIndustry, faBeer, faBuilding, faQuoteLeft, faCalendarAlt, faEllipsisH, faTrashAlt, faEdit);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
