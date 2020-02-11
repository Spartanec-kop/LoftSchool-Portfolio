<template lang="pug">
.container
  .works-wrapper
    .title
      .title-text 
        span Блок «Работы»
    .works-body   
      .edit-works(
        v-if="currentWork != null"
      )
        .edit-works-title 
          .edit-works-title-text Редактирование работы
        hr  
        .edit-works-body
          .import-image-wrapper.tooltip
            .admin-preview(
              v-if="currentWork.photo"
            )
              img.admin-edit-image-img#edit-img-preview(                 
                  :src="this.$baseUrl + currentWork.photo"
                  )
              .admin-preview-text(
                @click="uploadImage"
              )  Изменить превью
            .import-image(
                v-if="!currentWork.photo"
              )
              .import-image-content
                .import-image-text
                  span Перетащите или загрузите
                  br
                  span для загрузки изображения
                .fill-button-wrapper(
                  @click="uploadImage"
                )
                  fill-button(
                    text="ЗАГРУЗИТЬ"
                  )
            .input-tooltip(:class="{'showed':validation.hasError('currentWork.photo')}") {{validation.firstError('currentWork.photo')}}
          input#work-photo(
            type="file"
            ref="workImage"
            @change="changeImgFile"
          )                 
          .works-description
            admin-input.name-work(
              :labelText="'Название'"
              :isInvalid="validation.hasError('currentWork.title')"
              :toolTipText="validation.firstError('currentWork.title')"
              :id="'title-work'"
              :type="'input'"
              :val="currentWork.title"
              @change="nameChange"
            )

            admin-input.link-work(
              :labelText="'Ссылка'"
              :isInvalid="validation.hasError('currentWork.link')"
              :toolTipText="validation.firstError('currentWork.link')"
              :id="'link-work'"
              :type="'input'"
              :val="currentWork.link"
              @change="linkChange"
            )

            admin-input.desc-work(
              :labelText="'Описание'"
              :isInvalid="validation.hasError('currentWork.description')"
              :toolTipText="validation.firstError('currentWork.description')"
              :id="'desc-work'"
              :type="'textarea'"
              :val="currentWork.description"
              @change="descChange"
            )

            admin-input.tags-work(
              :labelText="'Добавление тэга'"
              :isInvalid="validation.hasError('currentWork.techs')"
              :toolTipText="validation.firstError('currentWork.techs')"
              :id="'tags-work'"
              :type="'input'"
              :val="currentWork.techs"
              @change="tagsChange"
            )
            .admin-tags
              tag.edit-tag(
                v-for="tag in currentWork.techs.split(', ')"
                :tag="tag"
                :edit="true"
                :key="currentWork.id + '_' + tag"
                @removeTag="removeTag"
              )
        .edit-works-buttons
          .edit-works-cancel(
            @click="cancelEdit"
          ) Отмена
          .edit-works-save(
            @click="saveEdit"
          )
            fill-button(
              text="СОХРАНИТЬ"
            )
      .works-list 
        .add-new-work.works-list-item(
          @click="addNewWork"
        )
          .plus 
            span +
          .add-new-work-text
            span Добавить
            span работу  
        work.works-list-item(
          v-for="work in works"
          :work="work"
          :selected="currentWork && work.id == currentWork.id"
          @editWork="selectWork"
          @removeWork="removeWork"
          :key="`work_${work.id}`"
        )    
</template>
<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;

import tag from './tag'
import work from './work'
export default {
  mixins: [SimpleVueValidator.mixin],
  components:{tag, work},
  name: 'myWorks',
  data(){
    return{
      currentWork: null,
      works:[],
    }
  },
  validators:{
    'currentWork.title'(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
    'currentWork.description'(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
    'currentWork.link'(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
    'currentWork.techs'(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
    'currentWork.photo'(value){
      return Validator.value(value).required('Нужно загрузить фото');
    }
  },
  methods:{
    removeTag(val){
      let tags = this.currentWork.techs.split(', ')
      tags.forEach((element, i) => {
        if(element == val){
          tags.splice(i, 1);
        }
      this.currentWork.techs = tags.join(', ');
      });
    },
    uploadImage(){
      this.$refs.workImage.click();
    },
    changeImgFile(e){
      this.currentWork.photo = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        var imgtag = document.getElementById("edit-img-preview");;
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(this.currentWork.photo);
    },
    nameChange(value){
      this.currentWork.title = value;
      
    },
    linkChange(value){
      this.currentWork.link = value;
    },
    descChange(value){
      this.currentWork.description = value;
    },
    tagsChange(value){
      this.currentWork.techs = value;
    },
    selectWork(work){
      this.currentWork = {...work};
    },
    removeWork(work){
      this.$axios.delete(`/works/${work.id}`)
        .then(Response => {
          this.works.splice(this.works.indexOf(work), 1);
        })
        .catch(error => {
          console.log(error.Response);
        });
    },
    cancelEdit(){
      this.currentWork = null;
    },
    saveEdit(){
      this.$validate()
        .then(success => {
          if (success) {
            if(!this.currentWork.id){
              var formData = new FormData();
              formData.append("title", this.currentWork.title);
              formData.append("techs", this.currentWork.techs);
              formData.append("photo", this.currentWork.photo);
              formData.append("link", this.currentWork.link);
              formData.append("description", this.currentWork.description);
              this.$axios.post(`/works`, formData, {
                                              headers: {
                                                'Content-Type': 'multipart/form-data'
                                              }
                })
              .then(Response => {
                this.works.push(Response.data);
              })
              .catch(error => {
                console.log(error.Response);
              });
              
            }
            else{
              var formData = new FormData();
              formData.append("title", this.currentWork.title);
              formData.append("techs", this.currentWork.techs);
              formData.append("photo", this.currentWork.photo);
              formData.append("link", this.currentWork.link);
              formData.append("description", this.currentWork.description);
              this.$axios.post(`/works/${this.currentWork.id}`, formData, {
                                              headers: {
                                                'Content-Type': 'multipart/form-data'
                                              }
                })
              .then(Response => {
                let tmp = this.works.find(f => f.id == this.currentWork.id);
                this.works[this.works.indexOf(tmp)] = Response.data.work;
                this.currentWork = null;
              })
              .catch(error => {
                console.log(error.Response);
              });
            }
          }
        })      
    },
    addNewWork(){
      this.currentWork = {
          id:null,         
          title: '',
          photo: null,
          link:'',
          description:'',
          techs:''

        };
      this.validation.reset();  
    }
  },
  beforeMount(){
    this.$axios.get(`/works/${this.$user.id}`)
    .then(Response => {
      this.works = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  }
}
</script>
<style lang="postcss" scoped>
#work-photo{
  display: none;
}
.works-wrapper{
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
.edit-works{
  padding: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
}
.edit-works-title{
  padding-bottom: 25px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.89;
}
hr{
  opacity: 0.15;
}
.edit-works-body{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  padding-top: 45px;
}
.import-image,
.works-description{
  padding:10px;
}
.admin-preview-text{
  font-size: 16px;
  font-weight: 600;
  line-height: 2.13;
  color: #383bcf;
  text-align: center;
  padding-top: 30px;
  cursor: pointer;
}
.import-image-wrapper {
  width: 100%;
  padding: 10px;
}
.import-image{
  background-color: #dee4ed;
  background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: darkgrey; stroke-width: 2; stroke-dasharray: 10 10'/></svg>");
  position: relative;
  width: 100%; 
}
.import-image{
  display: block;
  padding-top: 56%;    
}
.import-image-content{
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.import-image-text{
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.13;
}
.fill-button-wrapper{
  width: 181px;
  height: 50px;
  margin: 0 auto;
  margin-top: 27px;
}
.admin-input{
  &:nth-child(4){
    margin-bottom: 0px;
  }
}
.admin-tags{
  display: flex;
  padding-top: 20px;
}
.edit-tag{
  margin-right: 10px;
  &:last-child{
    margin-right: 0px;
  }
}
.desc-work{
  height:190px;
}
.edit-works-buttons{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 40px;
}
.edit-works-cancel{
  font-weight: 600;
  line-height: 2.13;
  color: #383bcf;
  padding-right: 60px;
  cursor: pointer;
}
.edit-works-save{
  height: 60px;
  width: 180px
}
.works-list{
  display: grid;
  padding-top: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
}
.works-list-item{
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
  background-color: white;
}
.add-new-work{
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  padding: 40px 0;
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

.add-new-work-text{
  font-size: 18px;
  font-weight: bold;
  line-height: 1.67;
  text-align: center;
  color: #ffffff;
  padding-top: 30px;

}
.add-new-work-text span{
      display: block;
    }

@media screen and (max-width: 768px) {
  .edit-works-body{
    grid-template-columns: 1fr;
    column-gap: 30px;
    max-width: 470px;
    margin: 0 auto;
  }
  .edit-works-buttons{
    justify-content: center;
  }
  .works-list{
    grid-template-columns: 1fr 1fr;
  }
}  

@media screen and (max-width: 500px) {
  .works-list{
    display: grid;
    grid-template-columns: 1fr;
  }
  .add-new-work{
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .add-new-work-text{
    padding-top: 0px;
    padding-left: 20px;
  }
  .add-new-work-text span{
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