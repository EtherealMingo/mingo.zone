<template>
  <div class="container mx-auto p-6 text-center">
    <h1 class="text-4xl font-bold text-red-500 mb-6">404 页面不存在</h1>
    <p class="text-gray-600 text-lg mb-8">您访问的页面可能已被移除或暂时不可用</p>
    <router-link 
      to="/"
      class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      返回首页
    </router-link>
  </div>
</template>

<script setup lang="ts">
// 使用Vue3组合式API
</script>

<style scoped>
.container {
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>