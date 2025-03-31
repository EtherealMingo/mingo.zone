<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onBeforeUnmount } from 'vue'

const hamburgerButton = ref<HTMLElement | null>(null)
const mobileMenu = ref<HTMLElement | null>(null)
const isMobileMenuOpen = ref(false)
const resumeButton = ref<HTMLElement | null>(null)
const handleClickOutside = (event) => {
  if (
    isMobileMenuOpen.value &&
    !mobileMenu.value?.contains(event.target) &&
    !hamburgerButton.value?.contains(event.target ) &&
    !resumeButton.value?.contains(event.target )
  ) {
    isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = (event) => {
  event.stopPropagation()
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const downloadResume = () => {
  window.open('https://www.mingo.zone/assets/resume.pdf', '_blank')
}
</script>

<template>
  <div class="container mx-auto">
    <header>
      <nav class="flex items-center justify-between p-4 bg-white shadow fixed top-0 container z-50">
        <div class="flex items-center space-x-6 max-lg:hidden">
          <router-link to="/" class="max-lg:hidden">
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

        <div class="flex-1 lg:hidden flex justify-center flex-row-reverse">
          <h1
            class="text-blue-600 text-xl font-bold absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <router-link to="/">mingo.zone</router-link>
          </h1>
        </div>
        <div class="lg:hidden order-first">
          <button
            @click="toggleMobileMenu"
            class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            ☰
          </button>
        </div>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-show="isMobileMenuOpen"
            class="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4 space-y-4"
          >
            <router-link to="/portfolio" class="block px-4 py-2 text-gray-600 hover:text-blue-600">
              作品集
            </router-link>
            <router-link to="/blog" class="block px-4 py-2 text-gray-600 hover:text-blue-600">
              博客
            </router-link>
          </div>
        </transition>

        <span
          ref="resumeButton"
          class="cursor-pointer text-gray-500 hover:text-blue-600 transition-colors lg:order-last"
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
