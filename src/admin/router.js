import VueRouter from "vue-router";
import axios from "./requests";
import login from "./components/login";
import about from "./components/about";
import myWorks from "./components/myWorks";
import reviews from "./components/reviews";
import store from "./store/index"

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "about",
      component: about
    },
    {
      path: "/works",
      name: "works",
      component: myWorks
    },
    {
      path: "/reviews",
      name: "reviews",
      component: reviews
    },
    {
      path: "/login",
      name: "login",
      component: login
    }
  ]
});

async function isAuthentificated() {
  let result = false;
  if (localStorage.getItem("token")) {
    await store.dispatch('setUser');
    if (store.getters.user){
      result = true
    }
    else{
      result = false
    }
  } else {
    result = false;
  }
  return result;
}

router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    isAuthentificated().then(result => {
      if (!result) {
        next("/login");
      } else {
        next();
      }
    });
  } else {
    isAuthentificated().then(result => {
      if (result) {
        next("/");
      } else {
        next();
      }
    })
    .catch(e =>{
      console.log(e);
    });
  }
});

export default router;
