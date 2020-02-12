<template lang="pug">
  header.header-admin
    .container
      .header-wrapper
        .avatar
          img.avatar-img(:src="this.$importImg('content/user.jpg')")
        .header-text  
          .name Павел Варнавский
          .title Панель администратора
          .logout(
            @click="logout"
          ) Выйти
</template>

<script>
export default {
  name: "header-admin",
  methods: {
    logout() {
      this.$axios
        .post("/logout")
        .then(response => {
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="postcss" scoped>
.header-admin {
  background-image: linear-gradient(to top, #3e3e59, #454573);
  color: #ffffff;
}

.header-wrapper {
  height: 80px;
  display: flex;
  justify-items: center;
}
.avatar {
  margin: auto 0;
}
.avatar-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.header-text {
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
}

.name {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.89;
}

.title {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  opacity: 0.5;
  padding-left: 28px;
}

.logout {
  opacity: 0.7;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-decoration: underline;
  margin-left: auto;
  cursor: pointer;
}
</style>
