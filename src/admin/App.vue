<template lang="pug">
.wrapper.admin-wrapper
  .content-background
    img(
      :class="authorized ? 'background-img' : 'background-img-login' "
      :src="this.$importImg('content/baloonAdmin.jpg')"
      )
  .content-background-black(
    v-if="!authorized"
  )    
  router-view
  .maincontent(
    v-if="authorized"
  )
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
      activeContent:'about',
      authorized:false
    }
  },
  methods:{
    changeContent(content){
      this.activeContent = content;
    }
  },
  created(){
    if(this.$token){
      this.$axios.get('/user')
      .then(response =>{
        this.authorized = true;
      })
      .catch( error => {
        document.location.href = "admin#/login";
      });
    }
    else{
      document.location.href = "admin#/login";
    }
  }
}
</script>
<style src="../styles/main.pcss" lang="postcss"></style>
<style lang="postcss">
.admin-wrapper{
  position: relative;
}
.content-background{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: -2;
}

.background-img{
  object-fit: cover;
  width: 100%;
  opacity: 0.1;
}
.background-img{
  object-fit: cover;
  width: 100%;
  opacity: 0.1;
}
.background-img-login{
  object-fit: cover;
  width: 100%;
  opacity: 0.5;
}
.content-background-black {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: -1;
}
</style>