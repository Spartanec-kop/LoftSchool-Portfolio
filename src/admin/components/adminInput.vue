<template lang="pug">
.admin-input.tooltip(
    :class="{'.admin-input__error':isInvalid}") 
  label.admin-input-label(:for="id") {{labelText}}   
  .admin-input-wrapper       
    input.admin-input-input(
      :name="id"
      :id="id"
      v-if="type == 'input'"
      v-model="value"
      @input="$emit('change', value)"
      @focus="focus=true")
    textarea.admin-input-textarea(
      :name="id"
      :id="id"
      v-if="type == 'textarea'"
      v-model="value"
      @input="$emit('change', value)")
  .input-tooltip(:class="{'showed':isInvalid}") {{toolTipText}}
</template>
<script>
export default {
  name: 'admin-input',
  props:['labelText', 'isInvalid', 'toolTipText', 'id', 'type', 'val'],
  data(){
    return {
      tooltipText:'',
      value:'',
      focus: false
    }
  },
  methods:{
  },
  mounted(){
    this.value = this.val;
  }
}
</script>
<style lang="postcss" scoped>

.admin-input{
  border-bottom: 1px solid black;
  width:100%;
  margin-bottom: 30px;
  &:hover{
      border-bottom: 1px solid $links-color;
      fill: $links-color;
      color: $links-color;
    }  
}
.admin-input-label{
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
}

.admin-input-wrapper{
  padding: 10px 0;
}
.admin-input-input,
.admin-input-textarea{
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: transparent;
  border-color: transparent;
}

.admin-input-textarea{
  min-height: 146px;
  line-height: 1.88;
  border: 1px solid #dee4ed;
  padding: 20px;
}

.admin-input__focus{
  border-bottom: 1px solid $links-color;
  fill: $links-color;
  color: $links-color;
}

.admin-input__error{
  border-bottom: 1px solid red;
  fill: red;
}

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
</style>