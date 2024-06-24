<template>
  <div class="content1">
    <router-view></router-view>
  <div class="dashboard">
    <div class="header">
      <h1>海洋牧场可视化系统</h1>
      <div class="header-info">
      <i class="iconfont icon-shijian" style="font-size: 22px;"></i><div>{{  dateFormat(nowTime) }}</div>
      <i class="iconfont icon-wendu" style="font-size: 24px;"></i><div>实时温度: {{ currentTemperature }}</div>
      </div>
    </div>
    <div class="column">
      <div class="video">
          <h2 style="margin-bottom: 10px; margin-top: -10px;">海洋牧场环境感知得分</h2> 
           <i class="iconfont icon--_zijiandefenyibiaopan" style="font-size: 35px; margin-bottom: 10px;"></i>
        <!-- 在这里嵌入图表 -->
      </div>
      <div class="alarm">
          <div class="warn">
          <h2>预警</h2>
          </div>
          <div class="warning-info">
              <i class="iconfont icon-ic_zsd_0333x" style="font-size: 40px;"></i>
              <p>水温过高！</p>
          </div>
      </div>
      <div class="controls">
        <h2 style="margin-bottom: 10px; margin-top: -10px;">网衣/鱼群监测</h2>
         <div class="chart-container">
          <!-- 这里插入图表的代码 -->
         </div>

          <!-- 网衣破损的警告 -->
          <div class="warning-info2">
              <i class="iconfont icon-baojingchuli" style="font-size: 24px;"></i>
              <p>网衣破损，请及时处理！</p>
          </div>
       </div>
    </div>
    <div class="column">
      <div class="data">
          <h2 style="margin-bottom: 10px; margin-top: -10px;">图像识别</h2>

<!-- 图像识别布局 -->
<div class="image-recognition">
<!-- 识别效果 -->
<div class="recognition-result">
  <!-- 这里插入识别效果 -->
  <h3>识别效果</h3>
</div>

<!-- 左右目布局 -->
<div class="camera-layout">
  <!-- 左目镜头 -->
  <div class="left-camera">
    <h3>左目镜头</h3>
    <video src="left-camera-video.mp4" controls></video>
  </div>

  <!-- 右目镜头 -->
  <div class="right-camera">
    <h3>右目镜头</h3>
    <video src="right-camera-video.mp4" controls></video>
  </div>
</div>
</div>
      </div>
      <div class="location">
        <h2 style="margin-bottom: 10px; margin-top: -10px;">实时数据</h2>
        <div class="real-time-data">
    <!-- 编号 -->
    <div class="data-item">
 
      <h3 style="margin-bottom: 10px; margin-top: -10px;">编号</h3> 
      <i class="iconfont icon-bianhao1" style="font-size: 24px; margin-right: 100px;"></i>

    </div>

    <!-- 鱼种 -->
    <div class="data-item">
      <h3 style="margin-bottom: 10px; margin-top: -10px;">鱼种</h3>
      <i class="iconfont icon-bianhao" style="font-size: 24px; margin-right: 100px;"></i>
    </div>

    <!-- 体长 -->
    <div class="data-item">
      <h3 style="margin-bottom: 10px; margin-top: -10px;">体长</h3>
      <i class="iconfont icon-tichang" style="font-size: 24px; margin-right: 100px;"></i>
    </div>

    <!-- 体重 -->
    <div class="data-item">
      <h3 style="margin-bottom: 10px; margin-top: -10px;">体重</h3>
      <i class="iconfont icon-024-zhongliang" style="font-size: 24px; margin-right: 100px;"></i>
    </div>

    <!-- 疑似患病 -->
    <div class="data-item">
      <h3>疑似患病</h3>

    </div>

    <!-- 鱼群异常 -->
    <div class="data-item">
      <h3>鱼群异常</h3>

    </div>

    <!-- 轨迹追踪 -->
    <div class="data-item">
      <h3 style="margin-bottom: 10px; margin-top: -10px;">轨迹追踪</h3>
      <i class="iconfont icon-guijizhuizong" style="font-size: 24px; margin-right: 100px;margin-top: -10px"></i>
    </div>

    <!-- 轨迹分析 -->
    <div class="data-item">
      <h3 style="margin-bottom: 10px; margin-top: -10px;">轨迹分析</h3>
      <i class="iconfont icon-guijifenxi" style="font-size: 24px; margin-right: 100px;"></i>
    </div>
  </div>
      </div>
    </div>
    <div class="column">
      <div class="status">
        <h2 style="margin-bottom: 10px; margin-top: -10px;">AI决策</h2>
        <div class="ai-decision-info">
          <p style="text-align: center; font-size: 20px; margin-top: 25px;">当前温度: 25°C</p>
      <p style="text-align: center; font-size: 20px;">光照强度: 1000 lx</p>
      <p style="text-align: center; font-size: 20px;">溶解氧浓度: 8.5 mg/L</p>
      <p style="text-align: center; font-size: 20px;">水质 pH: 7.2</p>
      <p style="text-align: center; font-size: 20px;">盐度: 30 ppt</p>

      </div>            

      </div>        
      <div class="tishi" style="margin-top: 30px; margin-left: 128px;">
          <i class="iconfont icon-tishi1" style="font-size: 24px"></i>
              <h2 style="text-align: center; font-size: 24px;">提示</h2>
           </div>
      <div class="qixiang" style="margin-top: 30px; margin-left: 128px;">
              <h2 style="text-align: center; font-size: 24px;margin-top: -10px">气象数据</h2>
              <div class="qixiangdata">
                  <div class="dataitem">
                  
                  <i class="iconfont icon-diwen" style="font-size: 70px; margin-right: 80px;"></i>
                  <h3 style="margin-bottom: 10px; margin-top: 10px;">0~7℃</h3> 
               </div>
              <div class="dataitem">
                  
                  <i class="iconfont icon-fengli" style="font-size: 52px; margin-right: 100px;"></i>
                  <h3 style="margin-bottom: 10px; margin-top: 10px;">东北风5级</h3>
              </div>
              <div class="dataitem">
                  <i class="iconfont icon-shuidi" style="font-size: 67px; margin-right: 80px;color: blue;"></i>
                  <h3 style="margin-bottom: 10px; margin-top: 10px;">96%</h3>
              </div>
              <div class="dataitem">
                  
                  <i class="iconfont icon-wuranzhishu" style="font-size: 60px; margin-right: 100px;"></i>
                  <h3 style="margin-bottom: 10px; margin-top: 10px;">78 良</h3>
                  </div>
              </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DateUtil",
  data() {
    return {
      nowTime: new Date(),
      currentTime: '', // 实时时间
      currentTemperature: 50, // 当前温度
      threshold: 30, // 设定的温度阈值
      waterPH: '', // 水质 pH
      waterTemperature: '', // 水温
      salinity: '', // 盐度
      latitude: '', // 纬度
      longitude: '', // 经度
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
    checkTemperature() {
    if (this.currentTemperature > this.threshold) {
      this.sendAlert();
    }
  },
  // 发送报警请求到后端
  sendAlert() {
    axios.post('http://localhost:3000/api/alert', {
      message: 'Temperature too high!',
      temperature: this.currentTemperature
    })
      .then(response => {
        console.log('Alert sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending alert:', error);
      });
  },
    // 获取实时数据
    fetchData() {
      axios.get('http://localhost:3000/api/data')
      .then(response => {
        this.currentTemperature = response.data.temperature; // 从服务器返回的数据中获取温度字段
        console.log(this.currentTemperature);
        this.checkTemperature(); // 检查温度是否超过阈值
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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
    }
  },
  // 检查温度是否超过阈值
  
  mounted() {
    // 启动定时器更新时间
    this.timer = setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
    // 获取实时数据
    this.fetchData();
    this.dataFetchTimer = setInterval(this.fetchData, 3600000); // 每1h获取一次数据
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


.column {
  width: 30%;
}

.video, .controls, .data, .location, .status {
  margin-bottom: 30px;
}

.video,.alarm,.controls, .data, .location, .status,.tishi ,.qixiang{
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(191, 125, 125, 0.1);
  color: black; /* 修改文本颜色为黑色 */
}

.video{
  width: 100%;
  height: 200px;
}
.alarm {
position: relative;
width: 100%;
  height: 100px;
  margin-bottom: 20px;
}

.warn {
position: absolute;
top: 0;
left: 2;
display: flex;
align-items: center;
}

.warning-info {
  position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
display: flex;
align-items: center;
}
.warning-info i {
margin-right: 10px; /* 调整图标和文本之间的间距 */
color: red; /* 设置图标颜色为红色 */
}

.warning-info p {
color: red; /* 设置文本颜色为红色 */
font-size: 20px;
}


.controls{
  width: 100%;
  height: 250px;
  position: relative;
}
.chart-container {
/* 图表容器样式 */
}

.warning-info2 {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
color: rgb(6, 6, 6); /* 警告信息文字颜色 */
padding: 10px;
display: flex;
align-items: center;
justify-content: center;
}

.warning-info2 i {
margin-right: 8px;
color: red;
}
.data{
  height: 450px;
  width: 125%;
}
.image-recognition {
display: flex;
flex-wrap: wrap;
justify-content: space-between; /* 左右排列 */
}

.recognition-result {
flex: 1; /* 占据剩余空间 */
margin-right: 5px; /* 调整识别效果和摄像头之间的间距 */
}

.camera-layout {
display: flex;
flex-direction: column; /* 上下排列 */
}

.left-camera,
.right-camera {
margin-top: 0px; /* 调整摄像头之间的上下间距 */
text-align: center;
}

video {
width: 100%;
}
.location{
  height: 200px;
  width: 125%;
}

.real-time-data {
display: grid;
grid-template-columns: repeat(4, 1fr); /* 每行四列 */
grid-gap: 20px; /* 方框之间的间距 */
}

.data-item {
border: 1px solid #ccc;
padding: 10px;
border-radius: 5px;
text-align: center;
}

.data-item h3 {
margin-bottom: 5px;
}

.data-item p {
margin: 0;
}

.status{
  margin-left: 25%;
  width:80%;
  height: 300px;
}
.tishi{
  margin-left: 50%;
  width:80%;
  height: 120px;
}
.qixiang{
  margin-left: 50%;
  width:80%;
  height: 150px;
}
.qixiangdata {
display: grid;
grid-template-columns: repeat(4, 1fr); /* 每行四列 */
grid-gap: 20px; /* 方框之间的间距 */
}
.dataitem {
  width: 60px;
  height: 100px;
border: 1px solid #ccc;
padding: 10px;
border-radius: 5px;
text-align: center;
}

.dataitem h3 {
margin-bottom: 5px;
}

.dataitem p {
margin: 0;
}
h2 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
