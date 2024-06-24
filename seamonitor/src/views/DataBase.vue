<template>
    <div class="content">
      <div class="upload-section">
        <input type="file" @change="handleFileChange" />
        <button @click="uploadFile">上传文件</button>
        <button @click="exportData">导出数据</button>
      </div>
      <div class="visualization-section">
        <h2>数据统计</h2>
        <div class="pentagon-chart">
          <canvas id="pentagon-chart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  import { saveAs } from 'file-saver';
  
  export default {
    data() {
      return {
        selectedFile: null,
        fishData: [],
        pentagonChart: null
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      uploadFile() {
        if (!this.selectedFile) {
          alert("请先选择一个文件");
          return;
        }
  
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          alert('文件上传成功');
          console.log('File uploaded successfully', response.data);
          this.fetchData();
        })
        .catch(error => {
          alert('文件上传失败');
          console.error("数据上传失败:", error);
        });
      },
      fetchData() {
        axios.get('http://localhost:3000/api/data')
          .then(response => {
            this.fishData = response.data;
            this.renderPentagonChart();
          })
          .catch(error => {
            console.error("获取数据失败:", error);
          });
      },
      renderPentagonChart() {
        const ctx = document.getElementById('pentagon-chart').getContext('2d');
        if (this.pentagonChart) {
          this.pentagonChart.destroy();
          this.pentagonChart = null;
        }
        this.pentagonChart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6'],
            datasets: [
              {
                label: '数据集',
                data: this.fishData, // 假设数据是适合雷达图的数据格式
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              r: {
                beginAtZero: true
              }
            }
          }
        });
      },
      exportData() {
        axios.get('http://localhost:3000/api/export', { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/zip' });
            saveAs(blob, 'exported_data.zip');
          })
          .catch(error => {
            console.error("导出数据失败:", error);
          });
      }
    },
    mounted() {
      this.fetchData(); // 初始化时获取数据
    }
  };
  </script>
  
  <style scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .upload-section {
    margin-bottom: 20px;
  }
  .visualization-section {
    width: 80%;
  }
  .pentagon-chart {
    width: 100%;
    height: 500px;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  