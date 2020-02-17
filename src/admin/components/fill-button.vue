<template lang="pug">
  .fill-button
    button {{text}}
</template>
<script>
export default {
  name: "fill-button",
  props: ["text"]
};
</script>
<style lang="postcss" scoped>
.fill-button {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #006aed, #3f35cb);
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

button {
  background: transparent;
  color: #ffffff;
  font-weight: 600;
  line-height: 1;
}
</style>
