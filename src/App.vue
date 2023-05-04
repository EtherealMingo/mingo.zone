<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { getHitokotoSentence } from "./api/otherApi";
</script>

<template>
  <header class="headerWrapper">
    <logo> Mingo Wang </logo>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/article">Article</RouterLink>
      <RouterLink to="/photo">Photo</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="postcss">
.headerWrapper {
  @apply flex justify-between items-center text-lg pt-4 pr-8 pl-8;
}
nav {
  @apply flex justify-end gap-2;
}
a {
  @apply hover:underline;
}
main {
  flex: 1;
}
</style>
