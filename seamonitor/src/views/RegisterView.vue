<template>
  <div id="app">
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <div class="form-group">
          <label for="avatar">Avatar:</label>
          <input type="file" id="avatar" @change="handleFileUpload" accept="image/*">
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null,
      errorMessage: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.avatar = event.target.files[0];
    },
    clearForm() {
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.avatar = null;
    },
    register() {
      this.errorMessage = '';  // 清空错误信息

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('password', this.password);
      if (this.avatar) {
        formData.append('avatar', this.avatar);
      }

      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      axios.post('http://localhost:3000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          alert('Registration successful!');
          this.$router.push('/');
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            this.errorMessage = 'Username and email already registered';
            this.clearForm();
          } else {
            this.errorMessage = 'Error registering user';
            this.clearForm();
          }
          console.error('Error:', error);
        });
    }
  }
};
</script>

<style scoped>
#app {
  background-image: url('/src/assets/registerbg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.register-container {
  max-width: 500px;
  height: auto;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #333;
}

.form-group {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

label {
  width: 200px;
  text-align: right;
  margin-right: 20px;
}

.error-message {
  color: red;
}
</style>
