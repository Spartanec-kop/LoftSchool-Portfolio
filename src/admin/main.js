import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import "core-js/stable";
import "regenerator-runtime/runtime";

import login from './components/login'
import maincontent from "./components/maincontent"
import picturePlugin from './utils/ImgSvg.plugin'
import plus from './components/plus.vue'
import fillButton from './components/fill-button.vue'
import adminInput from './components/adminInput'

const baseUrl = "https://webdev-api.loftschool.com/";
Vue.prototype.$token = localStorage.getItem('token') || '';

axios.defaults.baseURL = baseUrl;
axios.defaults.headers["Authorization"] = `Bearer ${Vue.prototype.$token}`;

Vue.prototype.$axios = axios;

const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'home',
      component: maincontent
    },
    { 
      path: '/login',
      name:'login', 
      component: login
    }
  ]
})
async function isAuthenticated(){
  let result = false;
  if (localStorage.getItem('token')){
    await axios.get('/user')
    .then(response =>{
      result = true;
    })
    .catch( error => {
      result = false;
    });
  }
  else{
    result = false;
  }
  return result
}
router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    !isAuthenticated()
    .then(result => {
      if (!result){
        next('/login')
      }
      else{
        next()
      }
    })    
  }
  else {
    next()
  }
})

Vue.component('plus', plus);
Vue.component('fill-button', fillButton);
Vue.component('admin-input', adminInput);
Vue.use(VueRouter)
Vue.use(picturePlugin)

Vue.prototype.$axios = axios;

new Vue({
  el: "#app-root",
  render: h => h(App),
  router,
});