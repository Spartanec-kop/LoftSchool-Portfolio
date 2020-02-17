<template lang='pug'>
  .comments
    .container  
      .comments-title#section5
        .comments-title-text Что обо мне говорят
        .comments-buttons
          button.comments-button-left(
            v-on:click="navigate('left')" 
            :disabled="leftButtonDisabled()" 
            :class="{ 'button-disable': leftButtonDisabled() }"
          )
            svg.comments-button-left-icon
               use(:xlink:href="createSvgUrl('arrow-down')")
          button.comments-button-right(
            v-on:click="navigate('right')" 
            :disabled="rightButtonDisabled()" 
            :class="{ 'button-disable': rightButtonDisabled() }"
          )
            svg.comments-button-right-icon
              use(:xlink:href="createSvgUrl('arrow-down')")
      .comments-body
        .comments-items
          comment(
            v-if="showingComment"
            v-for="(comment, index) of showingComment" 
            :comment="comment"
            :key="index"
            )
          
</template>

<script>
import axios from './../requests'
import comment from './comment'

export default {
  components:{comment},
  name: 'comments',
  data() {
    return{
      firstComment: 0,
      reviews:[]
    }
  },
  ready: function () {
    window.addEventListener('resize', this.handleResize)
  },
  async created(){
    await axios.get('/reviews/248')
    .then(Response => {
      this.reviews = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  },
  methods:{
    handleResize(){
      if (this.oneMessage()){
        navigate('left')
      }
      else{
         navigate('right')
      }
    },
    navigate(direction){
      switch(direction) {
      case 'left':
        this.firstComment == 0 ? this.firstComment = 0 : this.firstComment --;
        break
      case 'right':
        if (this.oneMessage())
          {this.firstComment + 1 == this.reviews.length ? this.firstComment + 1 : this.firstComment ++}
        else{
          this.firstComment + 2 == this.reviews.length ? this.firstComment + 2 : this.firstComment ++
        }    
        break
      }
    },
    createSvgUrl(iconName){
      let icon = require(`images/icons/${iconName}.svg`);
      return icon.default.url;
    },
    oneMessage(){
      return window.innerWidth <= 550 ? true : false
    },
    leftButtonDisabled(){
      return this.firstComment == 0
    },
    rightButtonDisabled(){
      if (this.oneMessage()){
        return this.firstComment == this.reviews.length - 1
      }
      else{
        return this.firstComment == this.reviews.length - 2
      }       
    }
  },
  computed:{
    showingComment(){ 
      if(this.oneMessage()){
        return [this.reviews[this.firstComment]]
      }
      else{
        return [this.reviews[this.firstComment],this.reviews[this.firstComment + 1]]
      } 
    }
  }
}
</script>