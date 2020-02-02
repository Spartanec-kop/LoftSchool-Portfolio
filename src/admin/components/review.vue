<template lang="pug">
  .admin-review(:class="selected ? 'selected' : ''")
    .admin-review-title
      img.admin-review-avatar-img(
        :src="this.$importImg(`content/${review.avatar ? review.avatar: 'emptiAvatar.jpg'}`)")
      .admin-review-person
        .admin-review-name {{review.name}}
        .admin-review-position {{review.position}}
    hr
    .admin-review-body 
      .admin-review-message {{review.text}}     
      .admin-review-buttons
        .admin-review-buttons-edit(
          :class="selected ? 'selected' : ''"
          @click="!selected ? $emit('editReview', review) : ''"
        )
          .admin-review-buttons-edit-text Править
          .admin-review-buttons-edit-icon
            svg
              use(:xlink:href="this.$importSvg('pencil')")
        .admin-review-buttons-remove(
          :class="selected ? 'selected' : ''"
          @click="!selected ? $emit('removeReview', review) : ''"
        )
          .admin-review-buttons-remove-text Удалить
          .admin-review-buttons-remove-icon &#215;
</template>
<script>
export default {
  name: 'review',
  props:{
    review:Object,
    selected:Boolean
  }
}
</script>
<style lang="postcss" scoped>
.admin-review{
  padding: 20px;
  height:100%;
}
.admin-review-title{
  display:flex;
}
.admin-review-avatar-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  Object-fit:cover;
}
.admin-review-person{
  padding-left: 20px;
}
.admin-review-name{
  font-size: 18px;
  font-weight: bold;
}
.admin-review-position{
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
}
hr{
  opacity: 0.15;
}
.admin-review-body{
  padding:10px;
  height:80%;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
}
.admin-review-message{
  opacity: 0.7;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.88
}
.admin-review-buttons{
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}
.admin-review-buttons-edit,
.admin-review-buttons-remove{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.admin-review-buttons-edit-icon svg{
  fill:#3f35cb;
  width: 17px;
  height: 17px;
  margin-top: 8px;
  
}
.admin-review-buttons-edit-text,
.admin-review-buttons-remove-text{
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  padding-right: 10px;
}
.admin-review-buttons-remove-icon{
  font-size: 30px;
  font-weight: 600;
  line-height: 0.8;
  color: rgb(204, 3, 3);
}

.selected{
  opacity: 0.3;
  cursor: default;
}
</style>