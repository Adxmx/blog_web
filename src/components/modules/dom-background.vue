<template>
  <div class="bg" ref="bgRef" :style="{'height': props.height, 'width': props.width}">
    <router-link target='_blank' :to="{name: 'guest-blog', params: {id: props.id}}">
    <h2 :style="{'font-size': props.size, 'letter-spacing': props.spacing }">{{ props.title }}</h2>
    </router-link>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'

const bgRef = ref()

const props = defineProps({
  id: Number,
  cover: String,
  title: String,
  height: String,
  width: String,
  size: String,
  spacing: String
})

onMounted(
  // 解决直接使用css属性background-image携带referer触发图片防盗链问题
  () => {
    const img = new Image()
    img.src = props.cover
    img.onload = () => {
      bgRef.value.style.backgroundImage = `url(${img.src})`
    }
  }
)
</script>

<style scoped>
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center center;
}

.bg h2 {
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  transition: transform 0.4s ease-in-out;
}

.bg h2:hover {
  transform: scale(1.1);
  box-shadow: 12px 12px 10px #0000001a;
}
</style>