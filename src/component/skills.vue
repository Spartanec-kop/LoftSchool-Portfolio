<template lang="pug">
  .skills
    svg(style="width:0; height:0; position: absolute;" aria-hidden="true")
      linearGradient#circleGradient(x1="0%" y1="0%" x2="100%" y2="0%")
        stop(offset="0%" stop-color="#4a00ed")
        stop(offset="100%" stop-color="#9300e8")
    .skill-group-title(v-for="skillsGroup of skills") {{skillsGroup.title}}
      .skill-group
        skill(v-for="item of skillsGroup.skills" :skill="item")
  
  
  //- .skills
  //-   - var skills = {frontend:{title:'Fron-end',skills:{html:{title:'HTML5',skillCount:50},css:{title:'CSS3',skillCount:30},js:{title:'javascript',skillCount:70},vue:{title:'jquery и Vue.js',skillCount:70}}},workflow:{title:'Workflow',skills:{git:{title:'GIT',skillCount:80},terminal:{title:'Terminal',skillCount:50},Gulp:{title:'Gulp',skillCount:10},webpack:{title:'Webpack',skillCount:30}}}}
  //-   svg(style="width:0; height:0; position: absolute;" aria-hidden="true")
  //-     linearGradient#circleGradient(x1="0%" y1="0%" x2="100%" y2="0%")
  //-       stop(offset="0%" stop-color="#4a00ed")
  //-       stop(offset="100%" stop-color="#9300e8")
  //-   each item in  skills
  //-     .skill-group-title #{item.title}
  //-     .skill-group
</template>

<script>
import skill from './skill'
export default {
  components:{skill},
  name: 'skills',
  props:{
    //skills:Object
  },
  data(){
    return{
      skills:{
        frontend:{
          title:'Fron-end',
          skills:{
            html:{
              title:'HTML5',
              skillCount:50
            },
            css:{
              title:'CSS3',
              skillCount:30
            },
            js:{
              title:'javascript',
              skillCount:70
            },
            vue:{
              title:'jquery и Vue.js',
              skillCount:70
            }
          }
        },
        workflow:{
          title:'Workflow',
          skills:{
            git:{
              title:'GIT',
              skillCount:80
            },
            terminal:{
              title:'Terminal',
              skillCount:50
            },
            Gulp:{
              title:'Gulp',
              skillCount:10
            },
            webpack:{
              title:'Webpack',
              skillCount:30
            }
          }
        }
      }
    }
  }
}
</script>