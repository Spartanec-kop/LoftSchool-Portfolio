import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/parallax";

import Vue from 'vue';
import skills from "./component/skills.vue"
import comments from "./component/comments.vue"
import myWorks from "./component/myWorks.vue"

new Vue({
  el:"#section4-body",
  components:{myworks: myWorks}
})

new Vue({
  el:"#appSkills",
  components:{skills}
})

new Vue({
  el:"#comments",
  components:{comments}
})