<template lang="pug">
.wrapper.admin-wrapper
  .content-background
    img.background-img(
      :src="this.$importImg('content/baloonAdmin.jpg')"
      )     
  header-admin(
    v-if="$router.currentRoute.name != 'login'"
  )
  main-menu(
    v-if="$router.currentRoute.name != 'login'"
    :active="$router.currentRoute.name"
  )
  .content
    router-view
</template>
<script>
import headerAdmin from "./components/headerAdmin";
import mainMenu from "./components/mainMenu";

export default {
  components: { "header-admin": headerAdmin, "main-menu": mainMenu },
  name: "App",
  data() {
    return {};
  }
};
</script>
<style src="../styles/main.pcss" lang="postcss"></style>
<style lang="postcss">
.admin-wrapper {
  position: relative;
}
.content-background {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: -2;
}

.background-img {
  object-fit: cover;
  width: 100%;
  opacity: 0.1;
}
.background-img {
  object-fit: cover;
  width: 100%;
  opacity: 0.1;
}
</style>
