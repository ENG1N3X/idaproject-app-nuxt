<template>
  <div class="product-list">
    <template v-if="fakeLoading">
      <AjaxLoader />
    </template>
    <template v-else-if="productsList.length">
      <div
        v-for="product in productsList"
        :key="product.id"
        class="product-list__item"
      >
        <ProductItem :product="product" />
      </div>
    </template>
    <template v-else>
      <p>Товары не найдены</p>
    </template>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import AjaxLoader from './AjaxLoader.vue'

export default {
  name: 'ProductList',
  components: { ProductItem, AjaxLoader },
  props: {
    productsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fakeLoading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.fakeLoading = !this.fakeLoading
    }, 750)
  },
}
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1440px) {
    justify-content: space-around;
  }
  .product-list__item {
    display: inline-block;
    max-width: 332px;
    padding: 0 8px;
    @media (min-width: 1440px) {
      &:nth-child(3n + 1) {
        padding-left: 0;
      }
      &:nth-child(3n + 3) {
        padding-right: 0;
      }
    }
  }
}
</style>
