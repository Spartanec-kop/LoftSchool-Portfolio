<template lang="pug">
div
  .content-background-black
  .login-wrapper
    .login-body
      .login-exit &#215;
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
          button.button-wrapper#sendLoginForm(
            :class="disableButton() ? 'buttonDisabled' : '' "
            :disabled="disableButton()"
          )
            span ОТПРАВИТЬ
</template>
<script>
import SimpleVueValidator from "simple-vue-validator";
const Validator = SimpleVueValidator.Validator;

import imputValidate from "../../component/input-validate";
export default {
  mixins: [SimpleVueValidator.mixin],
  components: { "imput-validate": imputValidate },
  name: "login",
  data() {
    return {
      login: "",
      password: ""
    };
  },
  computed: {},
  validators: {
    login: function(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    password: function(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    }
  },
  methods: {
    disableButton() {
      return (
        (this.validation.hasError("password") ||
        this.validation.hasError("login")) || this.validation.passedRecords.length < 2
      );
    },
    changeLogin(val) {
      this.login = val;
    },
    changePassword(val) {
      this.password = val;
    },
    submit() {
      this.$validate().then(async success => {
        if (success) {
          this.$axios
            .post("/login", {
              name: this.login,
              password: this.password
            })
            .then(response => {
              localStorage.setItem("token", response.data.token);
              this.$token = response.data.token;
              this.$axios.defaults.headers[
                "Authorization"
              ] = `Bearer ${response.data.token}`;
              this.$router.push({ name: "about" });
            })
            .catch(error => {
              console.log(error.response);
            });
        }
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.title {
  padding-bottom: 40px;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.67;
}
.login-wrapper {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.login-exit {
  text-align: end;
  font-size: 36px;
  font-weight: 600;
  line-height: 0.8;
  margin-top: 30px;
  margin-right: 30px;
  cursor: pointer;
}
.login-body {
  width: 563px;
  height: 517px;
  background-color: #ffffff;
}
.login-input {
  width: 100%;
  margin-bottom: 40px;
}
.form-wrapper {
  height: 100%;
  max-width: 440px;
  text-align: left;
  margin: 0 auto;
}
.button-wrapper {
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
  cursor: pointer;
  &:hover {
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
.buttonDisabled {
  opacity: 0.5;
  cursor: default;
  &:hover {
    background-image: linear-gradient(to right, #ad00ed, #5500f2);
  }
}
</style>
