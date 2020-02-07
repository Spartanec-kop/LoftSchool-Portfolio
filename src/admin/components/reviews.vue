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
              img.admin-edit-reviews-avatar-img#edit-avatar-preview(  
                  ref="reviewAvatar"               
                  :src="getAvatar()"
                  )
            input#reviews-photo(
              type="file"
              ref="reviewImage"
              @change="changeImgFile"
            )      
            .edit-reviews-avatar-text(
              @click="uploadImage"
            ) {{currentReview && currentReview.photo ? 'Изменить фото' : 'Добавить фото'}}
          .edit-reviews-comment  
            .edit-reviews-revier
              .edit-reviews-name
                admin-input.reviews-name(
                  :labelText="'Имя автора'"
                  :isInvalid="false"
                  :toolTipText="'toolTipText'"
                  :id="'reviews-name'"
                  :type="'input'"
                  :val="currentReview.author"
                  @change="authorChange"
                )
              .edit-reviews-position
                admin-input.reviews-position(
                  :labelText="'Титул автора'"
                  :isInvalid="false"
                  :toolTipText="'toolTipText'"
                  :id="'reviews-position'"
                  :type="'input'"
                  :val="currentReview.occ"
                  @change="occChange"
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
      reviews:[]
    }
  },
  methods:{
    cancelEdit(){
      this.currentReview = null;
    },
    uploadImage(){
      this.$refs.reviewImage.click();
    },
    changeImgFile(e){
      this.currentReview.photo = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        var imgtag = document.getElementById("edit-avatar-preview");
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(this.currentReview.photo)
    },
    getAvatar(){
      if (typeof(this.currentReview.photo) == 'Object'){
        var reader = new FileReader();

        reader.onload = function(event) {
        var imgtag = document.getElementById("edit-avatar-preview");
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(this.currentReview.photo)
      }
      if (this.currentReview && this.currentReview.id){
        return this.$baseUrl + this.currentReview.photo
      }
      else{
        return this.$importImg(`content/emptiAvatar.jpg`)
      }
    },
    saveEdit(){
      if(!this.currentReview.id){
        var formData = new FormData();
        formData.append("author", this.currentReview.author);
        formData.append("occ", this.currentReview.occ);
        formData.append("photo", this.currentReview.photo);
        formData.append("text", this.currentReview.text);
        this.$axios.post(`/reviews`, formData, {
                                        headers: {
                                          'Content-Type': 'multipart/form-data'
                                        }
          })
        .then(Response => {
          this.reviews.push(Response.data);
          this.currentReview = null;
        })
        .catch(error => {
          console.log(error.Response);
        });
      }
      else{
        var formData = new FormData();
        formData.append("author", this.currentReview.author);
        formData.append("occ", this.currentReview.occ);
        formData.append("photo", this.currentReview.photo);
        formData.append("text", this.currentReview.text);
        this.$axios.post(`/reviews/${this.currentReview.id}`, formData, {
                                        headers: {
                                          'Content-Type': 'multipart/form-data'
                                        }
          })
        .then(Response=>{
          let tmp = this.reviews.find(f => f.id == this.currentReview.id); 
          this.reviews[this.reviews.indexOf(tmp)] = Response.data.review;
          this.currentReview = null;
          })
        .catch(error => {
          console.log(error.Response);
        });
      }
    },
    authorChange(value){
      this.currentReview.author = value;
    },
    occChange(value){
      this.currentReview.occ = value;
    },
    messageChange(value){
      this.currentReview.text = value;
    },
    addNewreviews(){
      this.currentReview = {
        id:null,
        photo: null,
        author: '',
        occ: '',
        text: '',
      }
    },
    selectReview(review){
      this.currentReview = {...review};
    },
    removeReview(review){
        this.$axios.delete(`/reviews/${review.id}`)
        .then(Response => {
          this.reviews.splice(this.reviews.indexOf(review), 1);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    getContent(){
      this.$axios.get(`/reviews/${this.$user.id}`)
      .then(Response => {
        this.reviews = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
    }
  },
  beforeMount(){
    this.getContent();
  }
}
</script>
<style lang="postcss" scoped>
#reviews-photo{
  display: none;
}
.reviews-wrapper{
  padding-bottom: 40px;
}
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
  cursor: pointer;
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