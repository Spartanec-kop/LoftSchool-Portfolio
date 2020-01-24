import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}


import "./scripts/skills";
import "./scripts/parallax";

import Vue from 'vue';
import test from "./component/TestComponent.vue"
import skills from "./component/skills.vue"

new Vue({
  el:"#appSkills",
  components:{skills}
})