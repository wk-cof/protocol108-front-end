// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'vue-awesome/icons/github'
import Icon from 'vue-awesome/components/Icon'
import  "flipclock/compiled/flipclock.css";
// require('jquery/dist/jquery');

Vue.component('icon', Icon)


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
