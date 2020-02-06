<template lang="pug">
.container
  .about-wrapper
    .title
      .title-text 
        span Блок «Обо мне»
      .add-button(
        @click="addNewSkillGroup"
      )
        .plus_wrapper
          plus
        .button-text
          span Добавить группу
    .about-body            
      skillsGroup.item(
        v-for="item in categories"
        :defaultCategory="item"
        :key="item.id"
      )
</template>
<script>

import skillsGroup from "./skillsGroup"
export default {
  components:{skillsGroup},
  name: 'about',
  data(){
    return{
      categories:[]
    }
  },
  methods:{
    addNewSkillGroup(){
      this.categories.unshift({
            category: '',
          })
      }
  },
  beforeMount(){
    this.$axios.get('/categories')
    .then(Response => {
      this.categories = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  }
}
</script>
<style lang="postcss" scoped>
.about-wrapper{
  padding-bottom: 40px;
}
.title{
  display: flex;
  align-items: center;
  padding: 20px 0;
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
  row-gap: 20px;
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