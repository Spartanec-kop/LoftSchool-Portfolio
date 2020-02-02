<template lang="pug">
.container
  .reviews-wrapper
    .title
      .title-text 
        span Блок «Отзывы»
    .reviews-body
      .edit-reviews(
        v-if="currentReview != null"
      )
        .edit-reviews-title 
          .edit-reviews-title-text Новый отзыв
        hr  
        .edit-reviews-body
          .edit-reviews-avatar
            .edit-reviews-image
              img.admin-edit-reviews-avatar-img(                 
                  :src="this.$importImg(`content/${currentReview && currentReview.avatar ? currentReview.avatar: 'emptiAvatar.jpg'}`)"
                  )
            .edit-reviews-avatar-text {{currentReview && currentReview.avatar ? 'Изменить фото' : 'Добавить фото'}}
          .edit-reviews-comment  
            .edit-reviews-revier
              .edit-reviews-name
                admin-input.reviews-name(
                  :labelText="'Имя автора'"
                  :isInvalid="false"
                  :toolTipText="'toolTipText'"
                  :id="'reviews-name'"
                  :type="'input'"
                  :val="currentReview.name"
                  @change="nameChange"
                )
              .edit-reviews-position
                admin-input.reviews-position(
                  :labelText="'Титул автора'"
                  :isInvalid="false"
                  :toolTipText="'toolTipText'"
                  :id="'reviews-position'"
                  :type="'input'"
                  :val="currentReview.position"
                  @change="positionChange"
                )
            .edit-reviews-message
              admin-input.reviews-message(
                :labelText="'Отзыв'"
                :isInvalid="false"
                :toolTipText="'toolTipText'"
                :id="'reviews-message'"
                :type="'textarea'"
                :val="currentReview.text"
                @change="messageChange"
              )
            .edit-reviews-buttons
              .edit-reviews-cancel(
                @click="cancelEdit"
              ) Отмена
              .edit-reviews-save(
                @click="saveEdit"
              )
                fill-button(
                  text="СОХРАНИТЬ"
                )
      .reviews-list 
        .add-new-review.reviews-list-item(
          @click="addNewreviews"
        )
          .plus 
            span +
          .add-new-review-text
            span Добавить
            span отзыв  
        review.reviews-list-item(
          v-for="item in reviews"
          :review="item"
          :selected="currentReview && item.id == currentReview.id"
          @editReview="selectReview"
          @removeReview="removeReview"
          :key="`review_${item.id}`"
        )        
</template>
<script>
import review from './review'

export default {
  components:{review},
  name: 'reviews',
  data(){
    return{
      currentReview: null,
      reviews:[
        {
          id:1,
          name:'Ковальчук Дмитрий',
          avatar:'kovalchuc.jpg',
          position:'Основатель LoftSchool',
          text:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
        },
        {
          id:2,
          name:'Владимир Сабанцев',
          avatar:'sabancev.jpg',
          position:'Преподаватель',
          text:'Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах'
        },
        {
          id:3,
          name:'Иван Иванов',
          avatar:'ivanov.jpg',
          position:'Преподаватель',
          text:'Очень большой комментарий от преподавателя Иванова Ивана Ивановича'
        },
        {
          id:4,
          name:'Петр Петров',
          avatar:'petrov.jpg',
          position:'Преподаватель',
          text:'Этот комментарий оставил преподаватель Петров Петр Петрович и он очень этим доволен'
        },
        {
          id:5,
          name:'Тест Тестов',
          avatar:'testov.jpg',
          position:'Преподаватель',
          text:'Меня зовут Тестов Тест Тестович и это я оставил свой комментарий на сайте этого разработчика.'
        }

      ]
    }
  },
  methods:{
    cancelEdit(){
      this.currentReview = null;
    },
    saveEdit(){
      if(!this.currentReview.id){
        this.currentReview.id = this.reviews[this.reviews.length - 1].id + 1;
        this.reviews.push(this.currentReview);
      }
      else{
        let tmp = this.reviews.find(f => f.id == this.currentReview.id); 
        this.reviews[this.reviews.indexOf(tmp)] = this.currentReview;
      }
      this.currentReview = null;
    },
    nameChange(value){
      this.currentReview.name = value;
    },
    positionChange(value){
      this.currentReview.position = value;
    },
    messageChange(value){
      this.currentReview.text = value;
    },
    addNewreviews(){
      this.currentReview = {
        id:null,
        name:'',
        avatar:'',
        position:'',
        text:''
      }
    },
    selectReview(review){
      this.currentReview = {...review};
    },
    removeReview(review){
      this.reviews.splice(this.reviews.indexOf(review), 1);
    }
  }
}
</script>
<style lang="postcss" scoped>
.title{
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.title-text{
  font-size: 21px;
  font-weight: bold;
}
.edit-reviews{
  padding: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
}
.edit-reviews-title{
  padding-bottom: 25px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.89;
}
hr{
  opacity: 0.15;
}
.edit-reviews-body{
  display: flex;
  padding-top: 50px;
}
.admin-edit-reviews-avatar-img{
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
}
.edit-reviews-avatar{
  width:200px;
  height:200px;
}
.edit-reviews-avatar-text{
  padding-top: 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.13;
  color: #383bcf;
  text-align: center;
}
.edit-reviews-revier{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap:30px;
}
.edit-reviews-comment{
  padding-left: 30px;
  width:100%;
  max-width: 610px;
}
.reviews-message{
  height:180px;
}

.reviews-list{
  display: grid;
  padding-top: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
}

.reviews-list-item{
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
  background-color: white;
}


.add-new-review{
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
.plus{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 95px;
    font-weight: 600;
    line-height: 1;
    color: #ffffff;
    background: transparent;
    border-radius: 50%;
    border: 2px solid white;  
    cursor: pointer;  
    font-size: 72px;
    font-weight: 300;
  }

.add-new-review-text{
  font-size: 18px;
  font-weight: bold;
  line-height: 1.67;
  text-align: center;
  color: #ffffff;
  padding-top: 30px;

}
.add-new-review-text span{
   display: block;
}

.edit-reviews-buttons{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.edit-reviews-cancel{
  font-weight: 600;
  line-height: 2.13;
  color: #383bcf;
  padding-right: 60px;
  cursor: pointer;
}
.edit-reviews-save{
  height: 60px;
  width: 180px
}


@media screen and (max-width: 850px) {

  .reviews-list{
    grid-template-columns: 1fr 1fr;
  }
}  

@media screen and (max-width: 500px) {
  .reviews-list{
    display: grid;
    grid-template-columns: 1fr;
  }
  .add-new-review{
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .add-new-review-text{
    padding-top: 0px;
    padding-left: 20px;
  }
  .add-new-review-text span{
    display: inline;
    &:last-child{
      &::before{
        content: ' ';
      }
    }
  }
  .plus{
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  .container{
    width: 100%;
  }
}
</style>