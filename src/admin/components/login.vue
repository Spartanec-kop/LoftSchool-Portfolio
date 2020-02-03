<template lang="pug">
div
  .content-background-black
  .login-wrapper
    .login-body
      .title 
        span Авторизация
      .form-wrapper
        form.form-login(@submit.prevent="submit")     
          imput-validate.login-input.login(
            :iconName="'user'"
            :labelText="'Логин'" 
            :id="'login'"
            :type="'text'"
            :firstClass="'person-info-name'"
            :value="login"
            :isInvalid="validation.hasError('login')"
            :toolTipText="validation.firstError('login')"
            @change="changeLogin"
          )
          imput-validate.login-input.password(
            :iconName="'key'"
            :labelText="'Пароль'" 
            :id="'password'"
            :type="'password'"
            :firstClass="'person-info-name'"
            :value="password"
            :isInvalid="validation.hasError('password')"
            :toolTipText="validation.firstError('password')"
            @change="changePassword"
          )
          button.button-wrapper 
            span ОТПРАВИТЬ
</template>
<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;

import imputValidate from '../../component/input-validate'
export default {
  mixins: [SimpleVueValidator.mixin],
  components:{'imput-validate': imputValidate},
  name: 'login',
  data(){
    return{
      login:'',
      password:''
    }
  },
  validators:{
    login:function(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
    password:function(value){
      return Validator.value(value).required('Поле не должно быть пустым');
    },
  },
  methods:{
    changeLogin(val){
      this.login = val;
    },
    changePassword(val){
      this.password = val;
    },
    submit(){
      var self = this;
      this.$validate()
        .then(function (success) {
          if (success) {
           self.$axios.post('/login', {
             name:self.login,
             password: self.password
           })
           .then(response => {
             localStorage.setItem('token', response.data.token);
             self.$token = response.data.token;
             document.location.href = "admin#";
           })
           .catch(error => {
             console.log(error.response.data)
           })
          }
        });
    }
  }
}
</script>

<style lang="postcss" scoped>
.title{
  padding:40px 0px;
  text-align:center;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.67;
}
.login-wrapper{
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center; 
  z-index: 10;
}
.login-body{
  width: 563px;
  height: 517px;
  background-color: #ffffff;
}
.login-input{
  width:100%;
  margin-bottom: 40px;
}
.form-wrapper{
  height: 100%;
  max-width: 440px;
  text-align: left;
  margin: 0 auto;
}
.button-wrapper{
  display: flex;
  width: 347px;
  height: 80px;
  background-image: linear-gradient(to right, #ad00ed, #5500f2);
  margin: 0 auto;
  font-size: 18px;
  font-weight: bold;
  line-height: 2.67;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  border-radius: 40px 0;
  cursor:pointer;
  &:hover{
    background-image: linear-gradient(to left, #ad00ed, #5500f2);
  }
}
.content-background-black {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: black;
  opacity: 0.6;
  z-index: -1;
}
</style>