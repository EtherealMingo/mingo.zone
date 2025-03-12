<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";

const router = useRouter();
const backHome = () => {
  router.push({
    name: "Home",
    path: "/",
  });
};
const backPre = () => {
  router.go(-1);
};
</script>

<template>
  <div class="notFoundWrapper">
    <div class="notFound">
      <img src="@/assets/svg/undraw_page_not_found.svg" alt="" />
    </div>
    <div class="backHome">
      <el-button @click="backHome">首页</el-button>
      <el-button type="primary" @click="backPre">返回</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notFoundWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .notFound {
    padding-top: 5rem;
    display: flex;
    justify-content: center;
  }

  .backHome {
    margin-top: 2rem;
  }
}
</style>
