<template lang="pug">
  .container
    .connect
      .connect-title#section6 Связаться со мной
      .connect-body
        form.connect-form#connect-form(@submit.prevent="submit" )
          .person-info
            input-validate(
              :iconName="'user'"
              :labelText="'Введите ваше имя'" 
              :id="'connect-name'"
              :type="'text'"
              :firstClass="'person-info-name'"
              :value="nameValue"
              :isInvalid="validation.hasError('nameValue')"
              :toolTipText="validation.firstError('nameValue')"
              @change="changeName"
            )  
            input-validate(
              :iconName="'envelope'"
              :labelText="'Введите ваш email'" 
              :id="'connect-mail'"
              :type="'text'"
              :firstClass="'person-info-mail'"
              :value="mailValue"
              :isInvalid="validation.hasError('mailValue')"
              :toolTipText="validation.firstError('mailValue')"
              @change="changeMail"
            )                              
          .connect-message.tooltip(:class="{'input__error':validation.hasError('messageValue')}")
            label.input-label(for="connect-message-text") Сообщение к письму
            .connect-message-text-icon
              svg.connect-icon.connect-message-text-icon-icon
                use(:xlink:href="createSvgUrl('message')")
              textarea.connect-input.connect-message-text#connect-message-text(
                name="connect-message-text"
                v-model="messageValue")
            .input-tooltip(:class="{'showed':validation.hasError('messageValue')}") {{validation.firstError('messageValue')}}  
          button.send-form#send-comment Отправить
</template>
<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;

import inputValidate from './input-validate'

export default {
  mixins: [SimpleVueValidator.mixin],
  components:{'input-validate':inputValidate},
  name:'messageSection',
  data(){
    return{
      nameValue:'',
      mailValue:'',
      messageValue:''
    }
  },
  validators:{
    nameValue:function(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
    mailValue:function(value){
      return Validator.value(value).required('Поле не должно быть пустым').email('Не соответствует Email');
    },
    messageValue:function(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    }
  },
  computed:{
    nameValid(){
      return this.validation.hasError('nameValue')
    }
  },
  methods:{
    createSvgUrl(iconName){
      let icon = require(`images/icons/${iconName}.svg`);
      return icon.default.url;
    },
    changeName(val){
      this.nameValue = val;
    },
    changeMail(val){
      this.mailValue = val;
    },
    submit: function () {
        this.$validate()
          .then(function (success) {
            if (success) {
              var form = document.getElementById('connect-form');
              var data = new FormData(form);
              var request = new XMLHttpRequest();
              request.open('POST', 'http://free.ru', true);
              request.setRequestHeader('accept', 'application/json');
              request.send(data);
              request.onreadystatechange = function () {
                if (request.readyState < 4)
                    console.log('loading');
                else if (request.readyState === 4) {
                    if (request.status == 200 && request.status < 300)
                      console.log('success');
                    else
                      console.log('failure');
                }
              };
            }
          });
      }
  }

}
</script>

<style scoped>
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