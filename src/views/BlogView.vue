<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">技术博客</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 博客文章卡片 -->
      <div
        v-for="(post, index) in blogPosts"
        :key="index"
        class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h3>
        <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <span>{{ post.date }}</span>
          <span class="mx-2">•</span>
          <span>{{ post.readTime }}分钟阅读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const blogPosts = [
  {
    title: 'Vue3组合式API最佳实践',
    excerpt: '深入探讨Vue3组合式API在大型项目中的应用技巧',
    date: '2024-03-15',
    readTime: 8
  },
  {
    title: 'TailwindCSS响应式设计指南',
    excerpt: '使用TailwindCSS构建现代化响应式布局的完整指南',
    date: '2024-03-10',
    readTime: 12
  }
]
</script>

<style scoped>
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>