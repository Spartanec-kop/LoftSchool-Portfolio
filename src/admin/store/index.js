import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import about from "./modules/about";
import works from "./modules/works";
import reviews from "./modules/reviews";

export const store = new Vuex.Store({
  modules: {
    about,
    works,
    reviews
  }
});
