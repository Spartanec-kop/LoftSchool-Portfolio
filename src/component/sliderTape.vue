<template lang="pug">
  .slider-tape
    .preview(v-for="work in works" 
    :class="work.id == activeItem.id ? 'preview-active' : ''"
    @click="$emit('select-work', work)")
      img.sl-img.main-img(:src="createImageUrl(work.imageUrl)")
</template>
<script>
export default {
  name: 'sliderTape',
  props:{
    works: Array,
    activeItem: Object
  },
  methods:{
    createImageUrl(pictureName){
      return require(`images/content/${pictureName}`);
    }
  }
}
</script>