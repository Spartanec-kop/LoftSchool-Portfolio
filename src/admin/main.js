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

const baseUrl = Vue.prototype.$baseUrl = "https://webdev-api.loftschool.com/";
Vue.prototype.$token = localStorage.getItem('token') || '';

axios.defaults.baseURL = baseUrl;
axios.defaults.headers["Authorization"] = `Bearer ${Vue.prototype.$token}`;

axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  const originRequest = error.config;
  if ( error.response.status === 401 && error.response.data != 'Передан не валидный токен' ){
    return axios.post('/refreshToken')
      .then(response => {
        const token  = response.data.token;

        localStorage.setItem('token', token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        originRequest.headers["Authorization"] = `Bearer ${token}`;

        return axios(originRequest)
      })
  }
  return Promise.reject(error);
});

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
async function isAuthentificated(){
  let result = false;
  if (localStorage.getItem('token')){
    await axios.get('/user')
    .then(response =>{
      Vue.prototype.$user = response.data.user
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
    !isAuthentificated()
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