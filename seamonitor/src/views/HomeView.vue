<template>
  <div class="home">
    <div class="background-image"></div>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="buttons">
      <button class="signin-button" @click="goToLogin">Sign In</button>
      <button class="signup-button" @click="goToRegister">Sign Up</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToLogin() {
      this.$router.push('/login'); // 跳转到登录页面
    },
    goToRegister() {
      this.$router.push('/register'); // 跳转到注册页面
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  position: relative;
  min-height: 100vh;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/homebackground.png'); /* 背景图片路径 */
  background-size: cover;
  opacity: 1; /* 背景图片透明度 */
  z-index: -1; /* 将背景图片放置在最底层 */
}

.buttons {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.signin-button {
  background-color: #4CAF50; /* 绿色 */
}

.signup-button {
  background-color: #008CBA; /* 蓝色 */
}

button:hover {
  opacity: 0.8;
}
</style>
