<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">我的作品</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 作品卡片 -->
      <div
        v-for="(item, index) in portfolioItems"
        :key="index"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
          <p class="text-gray-600 mb-4">{{ item.description }}</p>
          <div class="flex space-x-2">
            <a
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {{ tag }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const portfolioItems = [
  {
    title: '智能家居控制系统',
    image: '/images/project1.jpg',
    description: '基于物联网的智能家居控制平台，支持多设备联动和语音控制',
    tags: ['Vue3', 'Node.js', 'IoT']
  },
  {
    title: '电商数据分析平台',
    image: '/images/project2.jpg',
    description: '实时可视化电商运营数据的BI系统，支持多维度分析',
    tags: ['React', 'TypeScript', 'D3.js']
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