<template>
  <HomeIntro />
  <HomeRank class="interval" />
  <HomeAnon class="interval" />
  <HomePub class="interval" />
</template>

<script setup>
import HomeIntro from '@/view/guest/home/home-intro.vue'
import HomeRank from '@/view/guest/home/home-rank.vue'
import HomeAnon from '@/view/guest/home/home-anon.vue'
import HomePub from '@/view/guest/home/home-pub.vue'
</script>

<style scoped>
.interval {
  margin-top: 10px;
}
</style>