<template lang="pug">
  .skill 
    svg(width="100%" height="100%" viewBox="0 0 42 42" class="skill-circle")                         
      circle(class="skill-circle-hole" cx="21" cy="21" r="15.91549430918954" fill="none")
      circle(class="skill-circle-ring" cx="21" cy="21" r="15.91549430918954" fill="none" stroke="#d2d3d4" stroke-width="3")
      //- circle(class="skill-circle-segment" cx="21" cy="21" r="15.91549430918954" fill="none" stroke="url(#circleGradient)" stroke-dasharray=`20 80` stroke-dashoffset="50")              
      circle(class="skill-circle-segment" cx="21" cy="21" r="15.91549430918954" fill="none" stroke="url(#circleGradient)" :stroke-dasharray="strokeDasharray" stroke-dashoffset="50")              
    .skill__title {{skill.title}}
</template>

<script>
export default {
  name: 'skill',
  props:{
    skill: Object
  },
  computed:{
    strokeDasharray(){
      return `${this.skill.skillCount} ${100 - this.skill.skillCount}`
    }
  }
}
</script>