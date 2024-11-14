<template>
  <div class="func">
    <a-input-search class="search" :bordered="false" placeholder="search..." size="small">
      <template #enterButton>
        <a-button type="text"><search-outlined style="color: rgba(0, 0, 0, 0.45)" /></a-button>
      </template>
    </a-input-search>
  </div>
</template>

<style scoped>
.func {
  text-align: right;
}

.search {
  margin-top: 20px;
}
</style>