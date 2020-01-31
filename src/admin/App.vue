<template lang="pug">
.wrapper.admin-wrapper
  .maincontent
    header-admin
    main-menu
    .content
</template>
<script>
import headerAdmin from "./components/headerAdmin"
import mainMenu from "./components/mainMenu"
import about from "./components/about"
import myWorks from "./components/myWorks"
import comments from "./components/comments"
export default {
  components:{'header-admin':headerAdmin, 'main-menu':mainMenu, about, 'my-works':myWorks, comments},
  name: 'App'
}
</script>
<style src="../styles/main.pcss" lang="postcss"></style>
<style lang="postcss">

</style>