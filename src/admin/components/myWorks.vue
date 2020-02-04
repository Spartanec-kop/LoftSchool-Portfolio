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
          .import-image-wrapper 
            .admin-preview(
              v-if="currentWork.imageUrl"
            )
              img.admin-edit-image-img(                 
                  :src="this.$importImg(`content/${currentWork.imageUrl}`)"
                  )
              .admin-preview-text  Изменить превью
            .import-image(
                v-if="!currentWork.imageUrl"
              )
              .import-image-content
                .import-image-text
                  span Перетащите или загрузите
                  br
                  span для загрузки изображения
                .fill-button-wrapper
                  fill-button(
                    text="ЗАГРУЗИТЬ"
                  )
          .works-description
            admin-input.name-work(
              :labelText="'Название'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'name-work'"
              :type="'input'"
              :val="currentWork.name"
              @change="nameChange"
            )

            admin-input.link-work(
              :labelText="'Ссылка'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'link-work'"
              :type="'input'"
              :val="currentWork.link"
              @change="linkChange"
            )

            admin-input.desc-work(
              :labelText="'Описание'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'desc-work'"
              :type="'textarea'"
              :val="currentWork.desc"
              @change="descChange"
            )

            admin-input.tags-work(
              :labelText="'Добавление тэга'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'tags-work'"
              :type="'input'"
              :val="currentWork.tags.join(', ')"
              @change="tagsChange"
            )
            .admin-tags
              tag.edit-tag(
                v-for="tag in currentWork.tags"
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

import tag from './tag'
import work from './work'
export default {
  components:{tag, work},
  name: 'myWorks',
  data(){
    return{
      currentWork: null,
      works:[
        {
          id:1,         
          name: 'Сайт школы образования',
          imageUrl: '1.jpg',
          link:'http://loftschool.ru',
          desc:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!',
          tags:['HTML','CSS', 'JavaScript']

        },
        {
          id:2,
          name: 'Сайт школы образования',
          imageUrl: '2.jpg',
          link:'http://loftschool.ru',
          desc:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!',
          tags:['HTML','CSS', 'JavaScript']
        },
        {
          id:3,
          name: 'Сайт школы образования',
          imageUrl: '3.jpg',
          link:'http://loftschool.ru',
          desc:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!',
          tags:['HTML','CSS', 'JavaScript']
        },
        {
          id:4,
          name: 'Сайт школы образования',
          imageUrl: '4.jpg',
          link:'http://loftschool.ru',
          desc:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!',
          tags:['HTML','CSS', 'JavaScript']
        },
        {
          id:5,
          name: 'Сайт школы образования',
          imageUrl: '5.jpg',
          link:'http://loftschool.ru',
          desc:'Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!',
          tags:['HTML','CSS', 'JavaScript']
        },
      ],
    }
  },
  methods:{
    removeTag(val){
      let tags = [...this.currentWork.tags]
      tags.forEach((element, i) => {
        if(element == val){
          tags.splice(i, 1);
        }
      this.currentWork.tags = tags;
      });
    },
    nameChange(value){
      this.currentWork.name = value;
    },
    linkChange(value){
      this.currentWork.link = value;
    },
    descChange(value){
      this.currentWork.desc = value;
    },
    tagsChange(value){
      this.currentWork.tags = value.split(', ');
    },
    selectWork(work){
      this.currentWork = {...work};
    },
    removeWork(work){
      this.works.splice(this.works.indexOf(work), 1);
    },
    cancelEdit(){
      this.currentWork = null;
    },
    saveEdit(){
      if(!this.currentWork.id){
        this.currentWork.id = this.works[this.works.length - 1].id + 1;
        this.works.push(this.currentWork);
      }
      else{
        let tmp = this.works.find(f => f.id == this.currentWork.id); 
        this.works[this.works.indexOf(tmp)] = this.currentWork;
      }
      this.currentWork = null;
    },
    addNewWork(){
      this.currentWork = {
          id:null,         
          name: '',
          imageUrl: '',
          link:'',
          desc:'',
          tags:[]

        };
    }
  }
}
</script>
<style lang="postcss" scoped>
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