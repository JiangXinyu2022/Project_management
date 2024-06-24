<template>
    <div>
      <h1>水质数据</h1>
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="(header, index) in tableHeaders" :key="index">{{ row[header] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DataView',
    data() {
      return {
        tableData: [],
        tableHeaders: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost:3000/api/data/Fish.csv'); // 替换为实际的API路径
          this.tableData = response.data;
          if (this.tableData.length > 0) {
            this.tableHeaders = Object.keys(this.tableData[0]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  