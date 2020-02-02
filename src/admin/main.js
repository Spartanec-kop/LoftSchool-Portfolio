import Vue from 'vue';
import App from './App.vue'
import picturePlugin from './utils/ImgSvg.plugin'
import plus from './components/plus.vue'

Vue.component('plus', plus);
Vue.use(picturePlugin)

new Vue({
  el: "#app-root",
  render: h => h(App)
});