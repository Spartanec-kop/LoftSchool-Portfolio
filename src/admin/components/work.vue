<template lang="pug">
  .admin-work(:class="selected ? 'selected' : ''")
    .admin-work-image
      img.admin-work-image-img(:src="work.imageUrl ? this.$importImg(`content/${work.imageUrl}`): ''")
      .admin-work-tags
        tag.edit-tag(
          v-for="tag in work.tags"
          :tag="tag"
          :key="work.id + '_' + tag"
        )
    .admin-work-body 
      .admin-work-name {{work.name}}
      .admin-work-desc {{work.desc}}
      .admin-work-link
        a(:href="work.link" target="_blank") {{work.link}}
      .admin-work-buttons
        .admin-work-buttons-edit(
          :class="selected ? 'selected' : ''"
          @click="!selected ? $emit('editWork', work) : ''"
        )
          .admin-work-buttons-edit-text Править
          .admin-work-buttons-edit-icon
            svg
              use(:xlink:href="this.$importSvg('pencil')")
        .admin-work-buttons-remove(
          :class="selected ? 'selected' : ''"
          @click="!selected ? $emit('removeWork', work) : ''"
        )
          .admin-work-buttons-remove-text Удалить
          .admin-work-buttons-remove-icon &#215;
</template>
<script>
import tag from './tag'
export default {
  components:{tag},
  name: 'work',
  props:{
    work:Object,
    selected:Boolean
  }
}
</script>
<style lang="postcss" scoped>
.admin-work-image{
  position: relative;
}
.admin-work-image-img{
  object-fit: cover;
  width: 100%;
}
.admin-work-tags{
  display: flex;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.edit-tag{
  margin-right: 10px;
  &:last-child{
    margin-right: 0px;
  }
}
.admin-work-body{
  padding: 40px 30px;

}
.admin-work-name{
  font-size: 18px;
  font-weight: bold;
  line-height: 1.67;
}
.admin-work-desc{
  opacity: 0.7;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.88;
  padding-top: 30px;
}
.admin-work-link{
  padding-top: 30px;
}
.admin-work-link a{
  font-size: 16px;
  font-weight: 600;
  line-height: 1.88;
  color: #383bcf;
  text-decoration: none;
  &:hover{
    text-decoration: underline;
  }
}
.admin-work-buttons{
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}
.admin-work-buttons-edit,
.admin-work-buttons-remove{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.admin-work-buttons-edit-icon svg{
  fill:#3f35cb;
  width: 17px;
  height: 17px;
  margin-top: 8px;
  
}
.admin-work-buttons-edit-text,
.admin-work-buttons-remove-text{
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  padding-right: 10px;
}
.admin-work-buttons-remove-icon{
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