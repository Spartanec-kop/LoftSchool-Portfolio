import Vue from 'vue';
import App from './App.vue'
import picturePlugin from './utils/ImgSvg.plugin'
import plus from './components/plus.vue'
import fillButton from './components/fill-button.vue'
import adminInput from './components/adminInput'

Vue.component('plus', plus);
Vue.component('fill-button', fillButton);
Vue.component('admin-input', adminInput);
Vue.use(picturePlugin)


new Vue({
  el: "#app-root",
  render: h => h(App)
});