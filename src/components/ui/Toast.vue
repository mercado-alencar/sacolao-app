<template>
  <div>
    <header>{{title}}</header>
    <section v-if="!htmlBody">{{body}}</section>
    <section v-if="htmlBody" v-html="htmlBody"></section>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:['header','message','html'],
  data() {
    return { title: "", body: "", htmlBody: "" };
  },
  mounted() {},
  methods: {}
};
</script>

<style>
</style>