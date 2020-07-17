<template>
  <main id="app">
    <section class="app-container">
      <app-menu></app-menu>
      <div class="loading-overlay" v-bind:class="{ hide: !loading}"></div>
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
import Menu from "@/components/Menu";
import { watchRequest } from "@/services/Resources";
export default {
  name: "App",
  components: {
    "app-menu": Menu
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    console.log("mounted");
    watchRequest(stillLoading => {
      this.loading = stillLoading;
    });
  }
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
.app-container {
  margin-top: 60px;
  min-height: calc(100vh - 120px);
}
.loading-overlay {
  position: fixed;
  padding: 0;
  margin: -20px;
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  transition: background 300ms ease;
  z-index: 999999;
}
.hide {
  background: transparent;
  opacity: 0;
  margin: 0;
  min-width: 0 !important;
  min-height: 0 !important;
  height: 0 !important;
  width: 0 !important;
  padding: 0;
  overflow: hidden;
}
</style>
