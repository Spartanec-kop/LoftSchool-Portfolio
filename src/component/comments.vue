<template lang='pug'>
  .comments
    .container  
      .comments-title#section5
        .comments-title-text Что обо мне говорят
        .comments-buttons
          button.comments-button-left(v-on:click="navigate('left')")
            svg.comments-button-left-icon L
              //- use(xlink:href="./sprite.svg#arrow-down")
          button.comments-button-right(v-on:click="navigate('right')")
            svg.comments-button-right-icon R
              //- use(xlink:href="./sprite.svg#arrow-down")
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
      pageLength: 2,
      comments:[
        {
          name:'Ковальчук Дмитрий',
          avatar:'kovalchuc',
          position:'Основатель LoftSchool',
          text:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
        },
        {
          name:'Владимир Сабанцев',
          avatar:'sabancev',
          position:'Преподаватель',
          text:'Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах'
        },
        {
          name:'Иван Иванов',
          avatar:'ivanov',
          position:'Преподаватель',
          text:'Очень большой комментарий от преподавателя Иванова Ивана Ивановича'
        },
        {
          name:'Петр Петров',
          avatar:'petrov',
          position:'Преподаватель',
          text:'Этот комментарий оставил преподаватель Петров Петр Петрович и он очень этим доволен'
        },
        {
          name:'Тест Тестов',
          avatar:'testov',
          position:'Преподаватель',
          text:'Меня зовут Тестов Тест Тестович и это я оставил свой комментарий на сайте этого разработчика.'
        }

      ]
    }
  },
  methods:{
    navigate(direction){
      switch(direction) {
      case 'left':
        this.firstComment == 0 ? this.firstComment = this.comments.length - 1 : this.firstComment = this.firstComment - 1;
        break

      case 'right':
        this.firstComment + 1 == this.comments.length ? this.firstComment = 0 : this.firstComment = this.firstComment + 1
        break
      }
    }
  },
  computed:{
    showingComment(){
      if(this.firstComment == this.comments.length -1 ){
        return [this.comments[this.firstComment],this.comments[0]]
      }
      return [this.comments[this.firstComment],this.comments[this.firstComment + 1]]  
    }
  }
}
</script>