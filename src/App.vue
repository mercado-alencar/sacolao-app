<template>
  <main id="app">
    <section class="app-container">
      <router-view></router-view>
    </section>
    <footer>
      Mercado Alencar - Desenvolvimento
      <a href="http://schirrel.dev">@schirrel</a>
    </footer>
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main,
section {
  position: relative;
  margin: 0px;
}
.container {
  margin: 15px 5px;
}
</style>
