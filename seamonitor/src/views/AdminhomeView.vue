<template>
  <div class="admin-home">
    <div class="sidebar">
      <div class="profile" @mouseenter="toggleDropdown" @mouseleave="hideDropdown">
        <!-- 添加头像元素 -->
        <img src="../assets/avatar.jpg" alt="Avatar">
        <!-- 下拉菜单 -->
        <div class="dropdown" :class="{ 'show': dropdownVisible }" @mouseenter="keepDropdown" @mouseleave="hideDropdown">
          <router-link to="/settings">设置</router-link>
          <button @click="logout">退出登录</button>
        </div>
      </div>
      <router-link to="/adminhome/main-info" class="button">主要信息</router-link>
      <router-link to="/adminhome/under-sea" class="button">水下系统</router-link>
      <router-link to="/adminhome/data-center" class="button">数据中心</router-link>
      <router-link to="/adminhome/smart-center" class="button">智能中心</router-link>
      <router-link to="/adminhome/admin-management" class="button">管理员管理</router-link>
      <router-link to="/adminhome/data-base" class="button">数据库</router-link>
    </div>
    <div class="content1" v-if="$route.meta.show">
      <router-view></router-view>
    </div>
    <div class="content">
      <router-view v-if="showContent('data-center')" class="data-center"></router-view>
      <router-view v-if="showContent('main-info')" class="main-info"></router-view>
      <router-view v-if="showContent('under-sea')" class="under-sea"></router-view>
      <router-view v-if="showContent('smart-center')" class="smart-center"></router-view>
      <router-view v-if="showContent('admin-management')" class="admin-management"></router-view>
      <router-view v-if="showContent('data-base')" class="data-base"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data() {
    return {
      dropdownVisible: false,
      hideDropdownTimer: null
    };
  },
  methods: {
    showContent(viewName) {
      return this.$route.meta && this.$route.meta.showContent === viewName;
    },
    toggleDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    keepDropdown() {
      this.dropdownVisible = true;
    },
    logout() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.admin-home {
  display: flex;
  height: 100vh;
}

.sidebar {
  background-color: #bbb5b5;
  width: 200px;
  height: 918px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content1 {
  flex: 1;
  text-align: center;
  background-image: url('/src/assets/adminhomebg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 50px;
}

.button {
  display: block;
  padding: 15px 30px;
  margin-bottom: 80px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.button:hover {
  background-color: #0056b3;
}

.profile {
  position: relative;
  margin-bottom: 90px;
}

.profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}



.dropdown {
  position: absolute;
  top: 120px; /* 调整下拉菜单位置 */
  right: 10px; /* 调整下拉菜单位置 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: none;
}

/* 新增样式以确保下拉菜单显示 */
.dropdown.show {
  display: block;
}

.dropdown a {
  display: block;
  padding: 5px 0;
  color: #333;
  text-decoration: none;
}

.dropdown button {
  display: block;
  padding: 5px 0;
  width: 100%;
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  text-align: left;
}
</style>
