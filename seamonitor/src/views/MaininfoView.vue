<template>
  <div class="content1">
    <router-view></router-view>
    <div class="dashboard">
      <div class="header">
        <h1>海洋牧场可视化系统</h1>
        <div class="header-info">
          <i class="iconfont icon-shijian" style="font-size: 22px;"></i>
          <div>{{ dateFormat(nowTime) }}</div>
          <i class="iconfont icon-wendu" style="font-size: 24px;"></i>
          <div>实时温度: {{ currentTemperature }}</div>
        </div>
      </div>
      <div class="column">
        <div class="video">
          <h2>监控视频</h2>
          <!-- 在这里嵌入监控视频 -->
          <video src="/sea.mp4" controls></video>
        </div>
        <div class="controls">
          <h2>设备控制</h2>
          <div class="button-container">
            <div class="button-icon">
              <i class="iconfont icon-shexiangtou"></i>
              <button @click="toggleCamera" class="inner-button">摄像头 {{ cameraStatus ? '关闭' : '打开' }}</button>
            </div>
          </div>
          <div class="button-container">
            <div class="button-icon">
              <i class="iconfont icon-dengguang"></i>
              <button @click="toggleLight" class="inner-button">灯光 {{ lightStatus ? '关闭' : '打开' }}</button>
            </div>
          </div>
          <div class="button-container">
            <div class="button-icon">
              <i class="iconfont icon-icon"></i>
              <button @click="toggleBrush" class="inner-button">清洁刷 {{ brushStatus ? '关闭' : '打开' }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="data">
          <h2>水文气象数据</h2>
          <!-- 在这里展示水文数据 -->
          <p>Water pH: {{ waterPH }}</p>
          <p>Water Temperature: {{ waterTemperature }}</p>
          <p>Salinity: {{ salinity }}</p>
        </div>
        <div class="location">
          <h2>定位信息</h2>
          <!-- 在这里展示海洋牧场位置 -->
          <p>Latitude: {{ latitude }}</p>
          <p>Longitude: {{ longitude }}</p>
          <div id="map" style="height: 200px;"></div> <!-- 添加一个div来显示地图 -->
        </div>
      </div>
      <div class="column">
        <div class="status">
          <h2>设备状态</h2>
          <!-- 在这里展示设备状态 -->
          <p>Camera Status: {{ cameraStatus }}</p>
          <p>Sensor Status: {{ sensorStatus }}</p>
          <p>Connection Status: {{ connectionStatus }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: "DateUtil",
  data() {
    return {
      nowTime: new Date(),
      currentTime: '', // 实时时间
      currentTemperature: '', // 当前温度
      waterPH: '', // 水质 pH
      waterTemperature: '', // 水温
      salinity: '', // 盐度
      latitude: 38.98733, // 初始纬度（示例值）
      longitude: 117.357796, // 初始经度（示例值）
      cameraStatus: '', // 摄像头状态
      sensorStatus: '', // 传感器状态
      connectionStatus: '', // 连接状态
      lightStatus: false, // 灯光状态
      brushStatus: false // 清洁刷状态
    };
  },
  methods: {
    // 格式化时间
    dateFormat() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let week = date.getDay(); // 星期
      let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",];
      return (" "+year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds + " " + weekArr[week]);
    },
    // 获取实时数据
    fetchData() {
      // 在这里添加获取实时数据的逻辑
      // 例如，从服务器获取实时数据并更新到data中的各个变量
    },
    // 切换摄像机状态
    toggleCamera() {
      this.cameraStatus = !this.cameraStatus;
    },
    // 切换灯光状态
    toggleLight() {
      this.lightStatus = !this.lightStatus;
    },
    // 切换清洁刷状态
    toggleBrush() {
      this.brushStatus = !this.brushStatus;
    },
    initMap() {
      const map = L.map('map').setView([this.latitude, this.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([this.latitude, this.longitude]).addTo(map)
        .bindPopup('海洋牧场位置')
        .openPopup();
    }
  },
  mounted() {
    // 启动定时器更新时间
    this.timer = setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
    // 获取实时数据
    this.fetchData();
    // 初始化地图
    this.initMap();
  },
  beforeUnmount() {
    // 销毁组件前清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
@import '~leaflet/dist/leaflet.css'; /* 引入Leaflet的CSS文件 */

.content1 {
  flex: 1;
  text-align: center;
  background-image: url('/src/assets/homebackground.png');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 50px;
}

.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.header {
  width: 100%;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}

.header-info {
  display: flex;
  align-items: center;
  margin-right: auto; /* 将header-info放置到右侧 */
}

.header-info > div {
  margin-right: 40px; /* 调整时间和温度之间的间距 */
}

.button-container {
  display: flex;
  align-items: center;
  width: 200px; /* 设置按钮框的宽度 */
  margin-bottom: 5px;
}

.button-icon {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
}

.inner-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 5px;
}

.button-icon i {
  margin-right: 8px;
}

.column {
  width: 30%;
}

.video, .controls, .data, .location, .status {
  margin-bottom: 30px;
}

.video,.controls, .data, .location, .status {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(191, 125, 125, 0.1);
  color: black; /* 修改文本颜色为黑色 */
}

.video{
  width: 100%;
  height: 400px;
}

.video video {
  width: 100%;
  height: 320px;
}

.controls{
  height: 150px;
}

.data{
  height: 300px;
}

.location{
  height: 300px;
}

.status{
  height: 300px;
}

h2 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
