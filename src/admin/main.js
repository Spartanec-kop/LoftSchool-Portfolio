import Vue from "vue";
import App from "./App.vue";

import axios from "./requests";
import "core-js/stable";
import "regenerator-runtime/runtime";
import store from "./store/index";
import VueRouter from "vue-router";
import router from "./router";
import picturePlugin from "./utils/ImgSvg.plugin";
import plus from "./components/plus.vue";
import fillButton from "./components/fill-button.vue";
import adminInput from "./components/adminInput";

Vue.prototype.$baseUrl = "https://webdev-api.loftschool.com/";

Vue.component("plus", plus);
Vue.component("fill-button", fillButton);
Vue.component("admin-input", adminInput);
Vue.use(VueRouter);
Vue.use(picturePlugin);

Vue.prototype.$axios = axios;
Vue.prototype.$user = { id: 248 };

new Vue({
  el: "#app-root",
  render: h => h(App),
  router,
  store
});
