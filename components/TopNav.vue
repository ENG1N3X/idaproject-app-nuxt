<template>
  <div class="top-nav">
    <h1 class="top-nav__heading">Добавление товара</h1>
    <SelectFilter />
  </div>
</template>

<script>
import SelectFilter from './SelectFilter.vue'

export default {
  name: 'TopNav',
  components: {
    SelectFilter,
  },
}
</script>

<style lang="scss" scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .top-nav__heading {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
  }
}
</style>
