<template lang="pug">
  .admin-tag
    .admin-tag-text {{tag}}
    .admin-tag-exit(
      v-if="edit"
      @click="$emit('removeTag', tag)"
    ) &#215;
</template>
<script>
export default {
  name: 'tag',
  props:['tag', 'edit']
}
</script>
<style lang="postcss" scoped>
.admin-tag{
  display: flex;
  width: max-content;
  padding: 3px 10px;
  background-color: #e6e6e6;
  border-radius: 25px;
}
.admin-tag-exit{
  padding-left: 5px;
  opacity: 0.7;
  font-size: 20px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
}
.admin-tag-text{
  /* padding-left: 5px; */
  opacity: 0.7;
  font-size: 13px;
  font-weight: 600;
}
</style>