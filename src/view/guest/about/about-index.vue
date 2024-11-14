<template>
  <a-row :gutter="16">
    <a-col :span="18">
      <img-action :width="'100%'" :height="'600px'" :action="false" :dimension="'width'" :url="'https://unsplash.it/800/600?image=1005'" />
    </a-col>
    <a-col :span="6">
      <a-card title="关于我">
        <p class="intro">Adxm，“雅俗共赏”站长，90后的准大叔，0和1路上的小学生，自由路上的探索者。然而现实是牛棚下的苦力，马厩下的耐力，秉承着吃苦耐劳的信念，弘扬着我为老板的精神。</p>
        <p class="intro">喜欢纯音乐，阅读，下棋，旅行和冒险，当然还有游戏和做游戏。希望有朝成为一名独立游戏开发者。讨厌上班，不想早起。梦想领低保，开法拉，早日财富自由，开启全球之旅。</p>
        <p class="intro">人生箴言：路漫漫其修远兮，吾将上下而求索。</p>
        <p class="intro">（待后期页面重新设计）</p>
        <a-divider />
      </a-card>
    </a-col>
  </a-row>

</template>

<script setup>
import ImgAction from '@/components/modules/img-action.vue'
</script>

<style scoped>
.intro {
  letter-spacing: 3px;
  text-indent: 2em;
  line-height: 27px;
  color: #999999;
  font-size: 15px;
  font-weight: 400;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-thickness: from-font;
  text-underline-offset: 5px;
}

.ant-card {
  border-radius: 0px;
  height: 600px;
}
</style>