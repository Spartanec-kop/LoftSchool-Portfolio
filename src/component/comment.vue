<template lang='pug'>
  .comment-item
    .comment-item-apos
      svg.comment-item-apos-icon "
          use(:xlink:href="createSvgUrl('quote')")
    .comment-item-body
      .comment-item-text
        p {{comment.text}}
      .comment-item-person
        .comment-item-person-avatar
          img.avatar-img(:src="'https://webdev-api.loftschool.com/' + comment.photo")
        .comment-item-person-Name
          span.person-Name {{comment.author}}
          br
          span.person-position {{comment.occ}}  
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
    }
  }
}
</script>