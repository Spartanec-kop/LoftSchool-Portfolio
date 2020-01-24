<template lang='pug'>
  .comment-item
    .comment-item-apos
      svg.comment-item-apos-icon "
          //- use(xlink:href="./sprite.svg#quote")
    .comment-item-body
      .comment-item-text
        p {{comment.text}}
      .comment-item-person
        .comment-item-person-avatar аватар
          //- +image(`content/ivanov.jpg`, 'avatar-img')
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
  name: 'coment'
}
</script>