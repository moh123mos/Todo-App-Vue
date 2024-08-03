<template>
  <nav class="nav-bar">
    <ul class="links">
      <li v-for="link in links" :key="link.name">
        <router-link :to="{ name: link.name }">{{
          link.meta.title
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// import { ref } from "vue";
import { useRouter } from "vue-router";
// const route = useRoute();
const router = useRouter();
const links = router.options.routes;
</script>
<style lang="scss" scoped>
nav {
  padding: 30px;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
  }
  li {
    margin-left: 10px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
