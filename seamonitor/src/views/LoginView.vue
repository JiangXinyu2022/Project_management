<template>
  <div class="login-container">
    <h2>Login</h2>
    <div class="login-type-selector">
      <button :class="{ active: loginType === 'admin' }" @click="setLoginType('admin')">Admin</button>
      <button :class="{ active: loginType === 'user' }" @click="setLoginType('user')">User</button>
    </div>
    <form @submit.prevent="login">
      <div class="form-group" v-if="loginType === 'admin'">
        <label for="adminUsername">Admin Username:</label>
        <input type="text" id="adminUsername" v-model="adminUsername" required>
      </div>
      <div class="form-group" v-if="loginType === 'admin'">
        <label for="adminPassword">Admin Password:</label>
        <input type="password" id="adminPassword" v-model="adminPassword" required>
      </div>
      <div class="form-group" v-if="loginType === 'user'">
        <label for="userUsername">User Username:</label>
        <input type="text" id="userUsername" v-model="userUsername" required>
      </div>
      <div class="form-group" v-if="loginType === 'user'">
        <label for="userPassword">User Password:</label>
        <input type="password" id="userPassword" v-model="userPassword" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginType: 'admin', // 默认为Admin登录
      adminUsername: '',
      adminPassword: '',
      userUsername: '',
      userPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    setLoginType(type) {
      this.loginType = type;
      this.clearForm(); // 切换登录类型时清空表单
    },
    async login() {
      this.errorMessage = '';  // 清空错误信息

      let loginData = {};
      if (this.loginType === 'admin') {
        loginData = {
          username: this.adminUsername,
          password: this.adminPassword,
          type: 'admin'
        };
      } else {
        loginData = {
          username: this.userUsername,
          password: this.userPassword,
          type: 'user'
        };
      }

      try {
        const response = await axios.post('http://localhost:3000/api/login', loginData);
        alert(response.data.message);

        if (this.loginType === 'admin') {
          this.$router.push('/adminhome');
        } else {
          this.$router.push('/userhome');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Error logging in';
        }
        this.clearForm(); // 清空表单
      }
    },
    clearForm() {
      this.adminUsername = '';
      this.adminPassword = '';
      this.userUsername = '';
      this.userPassword = '';
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 500px;
  height: 300px; /* 设置容器高度为300px */
  margin-top: 150px; /* 设置容器距离顶部的距离为100px */
  margin-left: 450px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-type-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-type-selector button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
}

.login-type-selector button.active {
  background-color: #007bff;
  color: #fff;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
