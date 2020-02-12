<template lang="pug">
  .plus 
    span +
</template>
<script>
export default {
  name: "plus"
};
</script>

<style scoped>
.plus {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
