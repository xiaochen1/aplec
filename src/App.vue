<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

@import "assets/css/normalize.css";
@import "assets/css/global.css";
@import "assets/css/resetelement.css";
@import "assets/css/fontawesome/css/font-awesome.min.css";
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

html, body {
  /* width: 100%; */
  /* height: 100%; */
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  padding: 0;
}
</style>
