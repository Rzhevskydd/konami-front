<template>
  <div id="app">
    <div class="container" style="width:600px">

      <upload-files></upload-files>
    </div>
  </div>
</template>

<script>
import UploadFiles from './components/UploadFiles.vue'

export default {
  name: 'App',
  components: {
    UploadFiles
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
