import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scripts/parallax";

import Vue from 'vue';

import skills from "./component/skills";
import comments from "./component/comments";
import myWorks from "./component/myWorks";
import messageSection from "./component/messageSection";

new Vue({
  el:"#section4-body",
  components:{myworks: myWorks}
});

new Vue({
  el:"#appSkills",
  components:{skills}
});

new Vue({
  el:"#comments",
  components:{comments}
});

new Vue({
  el:"#connect",
  components:{'message-section': messageSection}
});