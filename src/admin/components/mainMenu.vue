<template lang="pug">
.container
  .main-menu-wrapper
    ul.admin-navigate
      li.navigate__item(
        v-for="item of this.navigateItem"
        @click="$emit('changeContent', item.section)"
        :class="active == item.section ? 'active' : ''"
        )
        a(class=`navigate__link`) {{item.title}}
            
            
</template>
<script>
export default {
  name: 'mainMenu',
  props:['active'],
  data(){
    return{
      navigateItem: [
        {
          section:'about',
          title:'Обо мне'
        },
        {
          section:'works',
          title:'Работы'
        },
        {
          section:'reviews',
          title:'Отзывы'
        }
      ]
    }
  }
}
</script>
<style lang="postcss" scoped>
.main-menu-wrapper{
  height: 80px;
}

.admin-navigate{
  display: flex;
  font-size:16px;
  font-weight:600;
  height:100%;
}

.navigate__link{
  margin: auto 30px; 
  justify-content: center;

}

.navigate__item{
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  &:hover {
    border-bottom: 2px solid $links-color;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: normal;
    text-align: center;
    color: #383bcf;
    color: $links-color
    }
}

.active{
  border-bottom: 2px solid $links-color;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: normal;
    text-align: center;
    color: #383bcf;
    color: $links-color
}
</style>