<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const downloadResume = () => {
  window.open('https://www.mingo.zone/assets/resume.pdf', '_blank')
}
</script>

<template>
  <div class="container mx-auto">
    <header>
      <nav class="flex items-center justify-between p-4 bg-white shadow fixed top-0 container z-50">
        <div class="flex items-center space-x-6">
          <router-link to="/">
            <h1 class="text-blue-600 text-xl font-bold">mingo.zone</h1>
          </router-link>
          <router-link
            to="/portfolio"
            class="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            作品集
          </router-link>
          <router-link
            to="/blog"
            class="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            博客
          </router-link>
        </div>
        <span
          class="cursor-pointer text-gray-500 hover:text-blue-600 transition-colors"
          @click="downloadResume"
        >
          简历💾
        </span>
      </nav>
    </header>

    <div class="pt-16">
      <RouterView />
    </div>
    <footer
      class="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600 flex flex-wrap justify-center items-center space-x-4"
    >
      <p>苏ICP备2024101751号</p>
      <p>
        Powered by
        <a href="https://www.mingo.zone" target="_blank" class="text-blue-600 hover:underline">
          mingo.zone
        </a>
      </p>
    </footer>
  </div>
</template>

<style scoped></style>
