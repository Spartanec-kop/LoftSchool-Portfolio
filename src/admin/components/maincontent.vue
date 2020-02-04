<template lang="pug">
.maincontent
    header-admin
    main-menu(
      :active = "activeContent"
      @changeContent="changeContent"
    )
    .content     
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
import headerAdmin from "./headerAdmin"
import mainMenu from "./mainMenu"
import about from "./about"
import myWorks from "./myWorks"
import reviews from "./reviews"
export default {
  components:{'header-admin':headerAdmin, 'main-menu':mainMenu, about, 'my-works':myWorks, reviews},
  name: 'maincontent',
  data(){
    return{
      activeContent:'about',
      authorized:false
    }
  },
  methods:{
    changeContent(content){
      this.activeContent = content;
    }
  }
}
</script>
<style lang="postcss" scoped>

</style>