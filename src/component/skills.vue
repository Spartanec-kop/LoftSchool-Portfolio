<template lang="pug">
  .skills
    svg(style="width:0; height:0; position: absolute;" aria-hidden="true")
      linearGradient#circleGradient(x1="0%" y1="0%" x2="100%" y2="0%")
        stop(offset="0%" stop-color="#4a00ed")
        stop(offset="100%" stop-color="#9300e8")
    .skill-group-title(v-for="category of categories") {{category.category}}
      .skill-group
        skill(v-for="(item, index) of category.skills" 
        :skill="item"
        :key="item.title + ' ' + index")
</template>

<script>
import skill from './skill'
import axios from './../requests'
export default {
  components:{skill},
  name: 'skills',
  props:{
    //skills:Object
  },
  data(){
    return{
      categories:{},
    }
  },
  created(){
    axios.get('/categories/248')
    .then(Response => {
      this.categories = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  }
}
</script>