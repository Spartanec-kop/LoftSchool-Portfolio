import Vue from 'vue';
import App from './App.vue'
import picturePlugin from './utils/ImgSvg.plugin'

Vue.use(picturePlugin)
new Vue({
  el: "#app-root",
  render: h => h(App)
});