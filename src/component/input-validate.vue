<template lang="pug">
  .input.tooltip(
    :class="[firstClass, {'input__error':isInvalid}]")  
    label.input-label(:for="id") {{labelText}}          
    div(
      :class="`${firstClass}-icon`"     
      )
      svg.connect-icon(
        v-if="iconName"
        )
        use(:xlink:href="createSvgUrl(iconName)")
      input.connect-input(
        :type="type" 
        :id="id" 
        :name="id"
        v-model="value"
        @input="$emit('change', value)")
    .input-tooltip(:class="{'showed':isInvalid}") {{toolTipText}}
</template>
<script>

export default {
  name: 'input-validate',
  props:['iconName', 'labelText', 'id', 'type', 'firstClass', 'isInvalid', 'toolTipText'],
  data(){
    return {
      tooltipText:'',
      value:''
    }
  },
  methods:{
    createSvgUrl(iconName){
      let icon = require(`images/icons/${iconName}.svg`);
      return icon.default.url;
    }
  }
}
</script>
<style lang="postcss" scoped>
/* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
    visibility: visible;
}
.input-tooltip{
  visibility: hidden;
}
/* Tooltip text */
.tooltip .input-tooltip {
    width: 80%;
    background-color: red;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
 .showed {
    visibility: visible;
}

.tooltip .input-tooltip::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent red transparent;
}


.input{
  border-bottom: 1px solid black;
  &:hover{
      border-bottom: 1px solid $links-color;
      fill: $links-color;
      color: $links-color;
    }  
}

.input__focus{
   border-bottom: 1px solid $links-color;
      fill: $links-color;
      color: $links-color;
}

.input__error{
  border-bottom: 1px solid red;
  fill: red;
}
</style>