<template lang="pug">
.wrapper.admin-wrapper
  .maincontent
    header-admin
    main-menu(
      :active = "activeContent"
      @changeContent="changeContent"
    )
    .content
      .content-background
        img.background-img(:src="this.$importImg('content/baloonAdmin.jpg')")
      about(
        v-if="activeContent == 'about'"
      )
      my-works(
        v-if="activeContent == 'works'"
      )
      reviews(
        v-if="activeContent == 'reviews'"
      )

</template>
<script>
import headerAdmin from "./components/headerAdmin"
import mainMenu from "./components/mainMenu"
import about from "./components/about"
import myWorks from "./components/myWorks"
import reviews from "./components/reviews"
export default {
  components:{'header-admin':headerAdmin, 'main-menu':mainMenu, about, 'my-works':myWorks, reviews},
  name: 'App',
  data(){
    return{
      activeContent:'works'
    }
  },
  methods:{
    changeContent(content){
      this.activeContent = content;
    }
  }
}
</script>
<style src="../styles/main.pcss" lang="postcss"></style>
<style lang="postcss">
.content{
  position: relative;
  background: 
}
.content-background{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: -1;
}

.background-img{
  object-fit: cover;
  width: 100%;
  opacity: 0.1;
}
</style>