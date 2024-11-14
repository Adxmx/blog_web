<template>
  <div class="tag">
    <span>{{ props.label }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: String
})
</script>

<style scped>
.tag {
    display: inline-block;
    text-align: center;
    width: 71px;
    height: 28px;
    margin: 0 8px 8px 0;
    padding: 2px 0;
    background-color: #f5f5f5;
    cursor: pointer;
    border-radius: 2px;
}

.tag span {
    font-size: 12px;
    opacity: 0.9;
    color: #888;
}

.tag:hover {
    background-color: #EAE9ED;
}

.tag:hover span {
    /* opacity: 1; */
    color: #000
}
</style>