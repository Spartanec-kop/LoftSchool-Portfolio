<template lang="pug">
.container
  .about-wrapper
    .title
      .title-text 
        span Блок «Обо мне»
      .add-button
        .plus_wrapper
          plus
        .button-text
          span Добавить группу
    .about-body            
      skillsGroup.item(
        v-for="item in skillGroups"
        :skillGroup="item"
      )
</template>
<script>

import skillsGroup from "./skillsGroup"
export default {
  components:{skillsGroup},
  name: 'about',
  data(){
    return{
      skillGroups:[
        {
          name: 'Workflow',
          skills:[
            {
              title: 'Git',
              count: 100
            },
            {
              title: 'Terminal',
              count: 10
            },
            {
              title: 'Gulp',
              count: 80
            },
            {
              title: 'Webpack',
              count: 70
            },
          ]
        },
        {
          name: 'Front-end',
          skills:[
            {
              title: 'HTML4',
              count: 100
            },
            {
              title: 'CSS3',
              count: 10
            },
            {
              title: 'JavaScript',
              count: 80
            },
            {
              title: 'jquery и Vue.js',
              count: 70
            },
          ]
        }
      ]
    }
  }
}
</script>
<style lang="postcss" scoped>
.title{
  display: flex;
  align-items: center;
  padding: 30px 0;
}
.add-button{
  display: flex;
  margin-left: 60px;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover{
    border-bottom: 2px solid #383bcf;
  }
}

.plus_wrapper{
  width: 21px;
  height: 21px;
  font-size: 15px;
}
.title-text{
  font-size: 21px;
  font-weight: bold;
}
.button-text{
  font-size: 16px;
  font-weight: 600;
  padding-left: 15px;
  color: #383bcf;
}

.about-body{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}

.item{
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
}

@media screen and (max-width: 768px) {
  .about-body{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
}

@media screen and (max-width: 600px) {
  .about-body{
    display: grid;
    grid-template-columns: 1fr;
  }
}

</style>