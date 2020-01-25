<template lang='pug'>
  .comments
    .container  
      .comments-title#section5
        .comments-title-text Что обо мне говорят
        .comments-buttons
          button.comments-button-left(v-on:click="navigate('left')" :disabled="leftButtonDisabled()" :class="{ 'button-disable': leftButtonDisabled() }")
            svg.comments-button-left-icon
               use(:xlink:href="createSvgUrl('arrow-down')")
          button.comments-button-right(v-on:click="navigate('right')" :disabled="rightButtonDisabled()" :class="{ 'button-disable': rightButtonDisabled() }")
            svg.comments-button-right-icon
              use(:xlink:href="createSvgUrl('arrow-down')")
      .comments-body
        -var comments=[{name:'Ковальчук Дмитрий',avatar:'kovalchuc',position:'Основатель LoftSchool',text:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'},{name:'Владимир Сабанцев',avatar:'sabancev',position:'Преподаватель',text:'Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах'}];
        .comments-items
          comment(v-for="comment of this.showingComment" :comment="comment")
          
</template>

<script>
import comment from './comment'
export default {
  components:{comment},
  name: 'comments',
  data() {
    return{
      firstComment: 0,
      comments:[
        {
          name:'Ковальчук Дмитрий',
          avatar:'kovalchuc.jpg',
          position:'Основатель LoftSchool',
          text:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
        },
        {
          name:'Владимир Сабанцев',
          avatar:'sabancev.jpg',
          position:'Преподаватель',
          text:'Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах'
        },
        {
          name:'Иван Иванов',
          avatar:'ivanov.jpg',
          position:'Преподаватель',
          text:'Очень большой комментарий от преподавателя Иванова Ивана Ивановича'
        },
        {
          name:'Петр Петров',
          avatar:'petrov.jpg',
          position:'Преподаватель',
          text:'Этот комментарий оставил преподаватель Петров Петр Петрович и он очень этим доволен'
        },
        {
          name:'Тест Тестов',
          avatar:'testov.jpg',
          position:'Преподаватель',
          text:'Меня зовут Тестов Тест Тестович и это я оставил свой комментарий на сайте этого разработчика.'
        }

      ]
    }
  },
  ready: function () {
    window.addEventListener('resize', this.handleResize)
  },
  methods:{
    handleResize(){
      if (this.oneMessage()){
        navigate('left')
      }
      else{
         navigate('right')
      }
    },
    navigate(direction){
      switch(direction) {
      case 'left':
        this.firstComment == 0 ? this.firstComment = 0 : this.firstComment --;
        break
      case 'right':
        if (this.oneMessage())
          {this.firstComment + 1 == this.comments.length ? this.firstComment + 1 : this.firstComment ++}
        else{
          this.firstComment + 2 == this.comments.length ? this.firstComment + 2 : this.firstComment ++
        }    
        break
      }
    },
    createSvgUrl(iconName){
      let icon = require(`images/icons/${iconName}.svg`);
      return icon.default.url;
    },
    oneMessage(){
      return window.innerWidth <= 550 ? true : false
    },
    leftButtonDisabled(){
      return this.firstComment == 0
    },
    rightButtonDisabled(){
      if (this.oneMessage()){
        return this.firstComment == this.comments.length - 1
      }
      else{
        return this.firstComment == this.comments.length - 2
      }       
    }
  },
  computed:{
    showingComment(){ 
      if(this.oneMessage()){
        return [this.comments[this.firstComment]]
      }
      else{
        return [this.comments[this.firstComment],this.comments[this.firstComment + 1]]
      } 
    }
  }
}
</script>