<template>
  <div class="content1">
    <router-view></router-view>
    <div class="admin-panel">
      <h1>管理员管理界面</h1>
      <div class="container">
        <!-- 左侧用户列表 -->
        <div class="user-list">
          <h2>用户列表</h2>
          <ul>
            <li v-for="user in userList" :key="user.id" @click="selectUser(user)">
              <span>{{ user.username }}</span>
              <div class="actions">
                <button class="edit-btn" @click.stop="editUser(user)">编辑</button>
                <button class="delete-btn" @click.stop="deleteUser(user)">删除</button>
              </div>
            </li>
          </ul>
        </div>
        <!-- 右侧用户详情或添加用户表单 -->
        <div class="details-form">
          <div class="user-details" v-if="selectedUser">
            <h2>用户详情</h2>
            <p><strong>用户名:</strong> {{ selectedUser.username }}</p>
            <p><strong>邮箱:</strong> {{ selectedUser.email }}</p>
            <button class="close-btn" @click="closeDetails">关闭</button>
          </div>
          <div class="add-user-form" v-else>
            <h2>添加用户</h2>
            <form @submit.prevent="addUser">
              <div class="input-group">
                <label for="username">用户名:</label>
                <input type="text" id="username" v-model="newUser.username">
              </div>
              <div class="input-group">
                <label for="email">邮箱:</label>
                <input type="email" id="email" v-model="newUser.email">
              </div>
              <div class="input-group">
                <label for="password">密码:</label>
                <input type="password" id="password" v-model="newUser.password">
              </div>
              <button type="submit" class="submit-btn">添加用户</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [], // 用户列表
      newUser: { username: '', email: '', password: '' }, // 新用户表单数据
      selectedUser: null // 选定的用户详情
    };
  },
  methods: {
    // 获取用户列表（示例方法，实际应从服务器获取）
    fetchUserList() {
      // 模拟获取用户列表数据
      this.userList = [
        { id: 1, username: 'admin', email: 'admin@example.com' },
        { id: 2, username: 'user1', email: 'user1@example.com' },
        { id: 3, username: 'user2', email: 'user2@example.com' }
      ];
    },
    // 添加用户
    addUser() {
      // 模拟将新用户数据发送至服务器保存
      console.log('添加用户:', this.newUser);
      // 清空表单
      this.newUser = { username: '', email: '', password: '' };
    },
    // 编辑用户
    editUser(user) {
      // 打开用户详情面板
      this.selectedUser = user;
    },
    // 删除用户
    deleteUser(user) {
      // 模拟删除用户
      console.log('删除用户:', user);
      // 更新用户列表（此处应从服务器更新）
      this.userList = this.userList.filter(u => u.id !== user.id);
    },
    // 选择用户显示详情或添加用户表单
    selectUser(user) {
      this.selectedUser = user;
    },
    // 关闭用户详情
    closeDetails() {
      this.selectedUser = null;
    }
  },
  mounted() {
    // 页面加载时获取用户列表
    this.fetchUserList();
  }
};
</script>

<style scoped>
.content1 {
  flex: 1;
  text-align: center;
  background-image: url('/src/assets/homebackground.png');
  background-size: cover; /* 将背景图大小设置为 cover */
  background-position: center;
  color: white;
  height: 880px;
  width: 1500px;
  padding: 50px;
}

.admin-panel {
  width: 300%;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.container {
  display: flex;
  justify-content: space-between;
}

.user-list {
  width: 75%;
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-list li:hover {
  background-color: #f0f0f0;
}

.actions {
  display: flex;
  gap: 5px;
}

.add-user-form {
  width: 85%;
}

.input-group {
  margin-bottom: 10px;
}

.input-group label {
  display: block;
}

.input-group input {
  width: 105%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn,
.close-btn {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover,
.close-btn:hover {
  background-color: #0056b3;
}
</style>
