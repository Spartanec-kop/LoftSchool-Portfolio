<template lang='pug'>
  .comment-item
    .comment-item-apos
      svg.comment-item-apos-icon "
          use(:xlink:href="createSvgUrl('quote')")
    .comment-item-body
      .comment-item-text
        p {{comment.text}}
      .comment-item-person
        .comment-item-person-avatar аватар
          img.avatar-img(:src="createImageUrl(comment.avatar)")
        .comment-item-person-Name
          span.person-Name {{comment.name}}
          br
          span.person-position {{comment.position}}  
</template>
<script>
export default {
  props:{
    comment: Object
  },
  name: 'coment',
  methods:{
    createSvgUrl(iconName){
      let icon = require(`images/icons/${iconName}.svg`);
      return icon.default.url;
    },
    createImageUrl(pictureName){
      return require(`images/content/${pictureName}`);
      //return icon.default.url;
    }
  }
}
</script>