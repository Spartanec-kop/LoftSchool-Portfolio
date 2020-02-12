import VueRouter from "vue-router";
import axios from "./requests";
import login from "./components/login";
import about from "./components/about";
import myWorks from "./components/myWorks";
import reviews from "./components/reviews";

async function isAuthentificated() {
  let result = false;
  if (localStorage.getItem("token")) {
    await axios
      .get("/user")
      .then(response => {
        //Vue.prototype.$user = response.data.user;
        result = true;
      })
      .catch(error => {
        result = false;
      });
  } else {
    result = false;
  }
  return result;
}

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

router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    !isAuthentificated().then(result => {
      if (!result) {
        next("/login");
      } else {
        next();
      }
    });
  } else {
    !isAuthentificated().then(result => {
      if (result) {
        next("/");
      } else {
        next();
      }
    });
  }
});

export default router;
