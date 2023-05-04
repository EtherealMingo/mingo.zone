<script setup lang="ts">
import { getHitokotoSentence } from "@/api/otherApi";
import { onMounted, reactive, ref } from "vue";
interface sentenceInfoProp {
  commit_from: string;
  created_at: string;
  creator: string;
  creator_uid: number;
  from: string;
  from_who: null | string;
  hitokoto: string;
  id: number;
  length: number;
  reviewer: number;
  type: string;
  uuid: string;
}
let sentenceInfo = reactive<sentenceInfoProp>({
  commit_from: "",
  created_at: "",
  creator: "",
  creator_uid: 0,
  from: "",
  from_who: "",
  hitokoto: "",
  id: 0,
  length: 0,
  reviewer: 0,
  type: "d",
  uuid: "",
});
const getSentence = async () => {
  let res = await getHitokotoSentence({ c: "d", encode: "json", charset: "utf-8" });
  console.log(res);
  Object.assign(sentenceInfo, res);
};
getSentence();
</script>

<template>
  <figure class="figureWrapper">
    <img class="figureImg" src="@/assets/svg/undraw_reading_time_re_phf7.svg" alt="" />
    <div class="figureInfo pt-6 md:p-8 text-center md:text-left space-y-4">
      <blockquote>
        <p class="text-lg font-semibold">
          “{{ sentenceInfo.hitokoto || "社会乱象，根源在我。" }}”
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-cyan-600">{{ sentenceInfo.from_who }}</div>
        <div class="text-gray-500">{{ sentenceInfo.from || "伦敦日报" }}</div>
      </figcaption>
    </div>
  </figure>
</template>
<style lang="postcss" scoped>
.figureWrapper {
  @apply lg:flex bg-gray-100 rounded-xl p-8 lg:p-0 lg:justify-center  lg:py-4;
}
.figureImg {
  @apply h-auto rounded-full mx-auto w-64 lg:rounded-none lg:mx-0;
}
.figureInfo {
  @apply pt-6 lg:p-8 text-center lg:text-left space-y-4;
}
</style>
