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
  creator_uid: 4105,
  from: "",
  from_who: null,
  hitokoto: "",
  id: 4814,
  length: 27,
  reviewer: 4756,
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
  <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
    <img
      class="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
      src="@/assets/svg/undraw_reading_time_re_phf7.svg"
      alt=""
      width="384"
      height="512"
    />
    <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
      <blockquote>
        <p class="text-lg font-semibold">“{{ sentenceInfo.hitokoto }}”</p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-cyan-600">{{ sentenceInfo.from_who }}</div>
        <div class="text-gray-500">{{ sentenceInfo.from }}</div>
      </figcaption>
    </div>
  </figure>
</template>
