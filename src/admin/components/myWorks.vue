<template lang="pug">
.container
  .about-wrapper
    .title
      .title-text 
        span Блок «Работы»
    .works-body   
      .edit-works
        .edit-works-title 
          .edit-works-title-text Редактирование работы
        hr  
        .edit-works-body
          .import-image
            .import-image-content
              .import-image-text
                span Перетащите или загрузите
                br
                span для загрузки изображения
              .fill-button-wrapper
                fill-button(
                  text="ЗАГРУЗИТЬ"
                )
          .description
            input-validate(
              :iconName="'user'"
              :labelText="'Введите ваше имя'" 
              :id="'connect-name'"
              :type="'text'"
              :firstClass="'projectName'"
              value="nameValue"
              :isInvalid="false"
              toolTipText=""
            )
        .edit-works-buttons
      .works-list 
</template>
<script>
import inputValidate from "../../component/input-validate"
export default {
  components:{'input-validate': inputValidate},
  name: 'myWorks'
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
.edit-works{
  padding: 30px;
  background-color: white;
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
  column-gap: 10px;
  padding-top: 45px;
}
.import-image,
.description{
  padding:10px;
}
.import-image{
  background-color: #dee4ed;
  background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: darkgrey; stroke-width: 2; stroke-dasharray: 10 10'/></svg>");
  position: relative;
  width: 100%; 
  margin-left: 10px;
}
.import-image{
  content: "";
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

</style>