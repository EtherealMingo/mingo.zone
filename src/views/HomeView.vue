<<<<<<< HEAD
<template>
  <div class="mx-auto p-6">
    <div class="card mb-4">
      <figure class="text-end card-body m-0 cursor-pointer" @click="fetchHitokoto">
        <blockquote class="text-xl">
          <p id="hitokoto_text">{{ hitokoto.text }}</p>
        </blockquote>
        <figcaption v-if="hitokoto.showCaption" class="blockquote-footer m-0">
          {{ hitokoto.author }} - {{ hitokoto.source }}
        </figcaption>
      </figure>
    </div>
    <div>
      <p class="large-first-letter leading-10">
        🌟作为 ENFP
        性格的代表，我高度重视人际关系，倾向于建立深层次的联系，并热衷于探索新事物。我的创造力与想象力不仅体现在职业中，也贯穿于我的爱好之中。
      </p>
      <p class="large-first-letter leading-10">
        🎓在大学时期，我主修应用心理学，对人类行为和思维模式产生浓厚兴趣，并在此期间获得了三级心理咨询师资格证书。我非常重视与他人的互动和沟通，这也使得我在职业生涯初期选择了应用心理学领域。但最终，我发现自己对
        IT 行业，特别是前端开发更感兴趣。
      </p>
      <p class="large-first-letter leading-10">
        💻目前，我从事 B 端产品的前端开发工作，能够熟练应用 React 和 Vue
        框架，并积累了丰富的开发经验。我坚信技术的力量能够实现许多创新的想法，同时我也重视与团队成员的协作，以完成复杂项目。
      </p>
      <p class="large-first-letter leading-10">
        🎨在工作之外，我经常研究 PPT 设计并进行公开演讲。我致力于通过 PPT
        清晰地传达创意，并能够简化复杂的概念。我喜欢通过分享和交流来拓展自己的视野，也使得我的工作更具有创造性和活力。
      </p>

      <p class="large-first-letter leading-10">
        📷此外，我对摄影产生了浓厚的兴趣，通过它来捕捉生活中的瞬间，记录那些特殊而有价值的时刻。我相信摄影是一种表达自己想法和情感的方式，也是与他人分享生活的一种途径。我热爱大自然和城市生活，通过摄影来记录这些美好的瞬间，也使我更加热爱生活。
      </p>
      <p class="large-first-letter leading-10">
        📚我热衷于阅读和旅行，这能够让我接触到不同的思想和文化，使我更加开放和包容。在休闲时间，我也会阅读心理学和编程相关的书籍，进一步提高我的专业知识。
      </p>
      <p class="large-first-letter leading-10">
        🏠目前，我居住在一个带有浴缸的小房子中，这种生活方式简单且自给自足，使我能够充分投入工作和爱好，同时享受城市的便利。
      </p>
      <p class="">以上是我的自我介绍。如有任何问题或建议，请随时联系。感谢您的关注。</p>
    </div>
    <div class="space-y-4 mt-8">
      <li class="flex items-center">
        <span class="mr-2">📮 邮箱：</span>
        <a
          target="_blank"
          href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=aAUBBg8HRg0FCQEEKBkZRgsHBQ"
          style="text-decoration: none"
          ><img
            src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_01.png"
        /></a>
      </li>
      <li class="flex items-center relative group">
        <span class="mr-2">💬 微信：</span>
        <div
          class="wechat-icon flex items-center"
          @mouseover="showWechatPopup = true"
          @mouseleave="showWechatPopup = false"
        >
          <span class="text-blue-600 hover:underline cursor-pointer"> ehtereal_mingo </span>
          <transition name="fade">
            <div
              v-show="showWechatPopup"
              class="absolute left-0 bottom-8 bg-white p-2 rounded-lg shadow-xl z-50"
            >
              <img
                src="@/assets/images/wechat-qr-code.jpg"
                alt="微信二维码"
                class="w-32 h-45 object-cover"
              />
            </div>
          </transition>
        </div>
      </li>
      <li class="flex items-center">
        <span class="mr-2">📖 豆瓣：</span>
        <a
          href="https://www.douban.com/people/149924582"
          target="_blank"
          class="text-blue-600 hover:underline"
        >
          ethereal_mingo
        </a>
      </li>
      <li>
        <span class="mr-2">🐦 微博：</span>

        <a
          href="https://weibo.com/u/1816878571"
          target="_blank"
          class="text-blue-600 hover:underline"
          >白渡水</a
        >
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
const hitokoto = reactive({
  text: ':D 获取中...',
  author: '',
  source: '',
  showCaption: false,
})

const fetchHitokoto = async () => {
  try {
    const response = await fetch('https://v1.hitokoto.cn?c=d&encode=json')
    const data = await response.json()

    hitokoto.text = data.hitokoto
    hitokoto.author = data.from_who || ''
    hitokoto.source = data.from || ''
    hitokoto.showCaption = !!hitokoto.author || !!hitokoto.source
  } catch (_error) {
    hitokoto.text = '获取失败，点击重试'
    hitokoto.showCaption = false
  }
}

const showWechatPopup = ref(false)
onMounted(() => {
  fetchHitokoto()
})
</script>

<style scoped>
.large-first-letter::first-letter {
  font-size: 2em;
  /* 放大字体 */
  line-height: 1;
  /* 调整行高 */
  float: left;
  /* 使其浮动 */
  margin-right: 0.1em;
  /* 添加右边距 */
}
</style>
=======
<script setup lang="ts">
import SentenceFigure from "../components/SentenceFigure.vue";
import { onMounted, reactive, ref } from "vue";
</script>

<template>
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae eos assumenda sed?
    Ipsam rem, sint in totam molestiae voluptate. At fugit placeat quisquam impedit. Iure
    odio esse quas id nisi?
  </div>
  <SentenceFigure></SentenceFigure>
</template>
<style lang="postcss" scoped></style>
>>>>>>> 6ac7edc21728880c9b6a1489730bd3a1592767b0
