<!-- src/components/FileUpload.vue -->
<template>
    <div>
      <input type="file" @change="onFileChange" />
      <button @click="uploadFile">Upload</button>
    </div>
  </template>
  
  <script>
  import httpInstance from '@/api/http';
  
  export default {
    data() {
      return {
        selectedFile: null
      };
    },
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadFile() {
        if (!this.selectedFile) {
          alert('Please select a file first.');
          return;
        }
  
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        try {
          const response = await httpInstance.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response);
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  