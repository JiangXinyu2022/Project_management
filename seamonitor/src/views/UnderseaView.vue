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
        <!-- 鱼群数量 -->
        <div class="fishnum">
          <h2>鱼群数量</h2>
          <p>今日出生: {{ bornToday }}</p>
          <p>今日死亡: {{ diedToday }}</p>
        </div>
        <!-- 环境感知得分 -->
        <div class="env-score">
          <h2>环境感知得分</h2>
          <svg width="200" height="200">
            <!-- 绘制背景圆环 -->
            <circle cx="100" cy="100" r="80" stroke="#ddd" stroke-width="20" fill="none" />
            <!-- 绘制实际得分圆环 -->
            <circle :stroke-dasharray="circumference" :stroke-dashoffset="offset" cx="100" cy="100" r="80" stroke="#007bff" stroke-width="20" fill="none" />
            <!-- 显示得分数值 -->
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="central">{{ score }}</text>
          </svg>
        </div>
        <!-- 某鱼群数量变化 -->
        <div class="fishnumchan">
          <h2>某鱼群数量变化</h2>
          <!-- 添加Canvas元素用于显示折线图 -->
          <canvas id="fishPopulationChart"></canvas>
        </div>
      </div>
      <div class="column">
        <!-- 总信息统计显示 -->
        <div class="totalstatic">
          <h2>总信息统计显示</h2>
          <svg width="200" height="200">
            <!-- 绘制背景圆环 -->
            <circle cx="100" cy="100" r="80" stroke="#ddd" stroke-width="20" fill="none" />
            <!-- 绘制实际数据圆环 -->
            <circle :stroke-dasharray="circumference" :stroke-dashoffset="offset" cx="100" cy="100" r="80" stroke="#007bff" stroke-width="20" fill="none" />
            <!-- 显示数据数值 -->
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="central">{{ value }}</text>
          </svg>
        </div>
        <div class="distribution">
          <h2>鱼群属性分布曲线</h2>
          <canvas id="fishDistributionChart"></canvas>
        </div>
      </div>
      
      <div class="column">
        <div class="hardware">
          <h2>硬件信息</h2>
          <div class="hardware-item">
            <h3>网箱信息</h3>
            <p>网箱长度: {{ cageLength }}</p>
            <p>网箱宽度: {{ cageWidth }}</p>
            <p>网箱深度: {{ cageDepth }}</p>
            <p>网箱经度: {{ cageLongitude }}</p>
            <p>网箱纬度: {{ cageLatitude }}</p>
          </div>
          <div class="hardware-item">
            <h3>水底传感器</h3>
            <p>运行时间: {{ sensorRuntime }}</p>
            <p>下次检修: {{ sensorMaintenance }}</p>
            <p>保修过期: {{ sensorWarranty }}</p>
          </div>
        </div>
        <div class="variety">
          <h2>鱼群种类占比</h2>
          <div style="width: 300px; height: 250px;">
            <canvas id="fishVarietyChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// 在这里导入Chart.js
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
// 注册所需的图表
Chart.register(...registerables);
export default {
  name: "DateUtil",
  data() {
    return {
      nowTime: new Date(),
      currentTime: '', // 实时时间
      currentTemperature: '', // 当前温度
      bornToday: 0,
      diedToday: 0,
      score: 75, // 得分，可通过服务器端数据或其他方式设置
      radius: 80, // 圆环半径
      circumference: 2 * Math.PI * 80, // 圆环的周长
      offset: 0, // 圆环的偏移量，控制圆环的填充进度
      fishPopulationData: [], // 鱼群数量变化数据
      value: 60, // 数据值，可以通过服务器端数据或其他方式设置
      cageLength: '100m',
      cageWidth: '50m',
      cageDepth: '30m',
      cageLongitude: '128.034',
      cageLatitude: '56.123',
      sensorRuntime: '24天13小时43分钟',
      sensorMaintenance: '35天后',
      sensorWarranty: '2035年02月01日',
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
    animateScore() {
      const progress = this.score / 100; // 将得分转换为 0 到 1 的进度
      this.offset = this.circumference * (1 - progress); // 根据进度计算偏移量，以显示正确的得分
    },
    animate() {
      const progress = this.value / 100; // 将数据值转换为 0 到 1 的进度
      this.offset = this.circumference * (1 - progress); // 根据进度计算偏移量，以显示正确的数据值
    },
    // 获取实时数据
    fetchData() {
      axios.get('http://localhost:3000/api/data')
        .then(response => {
          this.processFishData(response.data);
        })
        .catch(error => {
          console.error("获取数据失败:", error);
        });
    },
    createChart() {
        const ctx = document.getElementById('fishPopulationChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels, // 用于横轴的标签，可以是日期等
                datasets: [{
                    label: '鱼群数量变化',
                    data: this.fishPopulationData, // 鱼群数量的变化数据
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },
    createDistributionChart() {
      const ctx = document.getElementById('fishDistributionChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
          datasets: [
            {
              label: '属性分布',
              data: [65, 59, 80, 81, 56, 55],
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    renderChart() {
      const ctx = document.getElementById('fishVarietyChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['种类1', '种类2', '种类3'], // 替换成你的鱼群种类
          datasets: [{
            label: '鱼群种类占比',
            data: [30, 40, 30], // 替换成你的鱼群种类占比数据
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          width: 200, // 图表的宽度
          height: 200, // 图表的高度
        }
      });
    },
  },
  computed: {
    // 计算今日出生和今日死亡的总数
    totalBornAndDiedToday() {
      return this.bornToday + this.diedToday;
    }
  },
  mounted() {
    // 启动定时器更新时间
    this.timer = setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
    // 获取实时数据
    this.fetchData();
    this.bornToday = 10; // 从服务器获取的今日出生的数量
    this.diedToday = 5; // 从服务器获取的今日死亡的数量
    this.animateScore();
    this.createChart();
    this.animate();
    this.createDistributionChart();
    this.renderChart();
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

.fishnum, .env-score, .fishnumchan, .totalstatic, .distribution,.hardware,.variety {
  margin-bottom: 30px;
}

.fishnum,.env-score, .fishnumchan, .totalstatic, .distribution,.hardware,.variety {
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(191, 125, 125, 0.1);
  color: black; /* 修改文本颜色为黑色 */
}

.fishnum{
  width: 300px;
  height: 100px;
}


.env-score{
  height: 250px;
}

.fishnumchan{
  height: 300px;
}

.totalstatic{
  height: 250px;
}

.distribution{
  height: 300px;
}

.hardware{
  height: 380px;
}

.variety{
  height: 300px;
}

h2 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
