<template>
  <div class="container">
    <div class="top-side">
      <TopNav />
    </div>
    <div class="content">
      <div class="left-side">
        <AddForm />
      </div>
      <div class="right-side">
        <ProductList :products-list="productsList" />
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import AddForm from '../components/AddForm.vue'
import ProductList from '../components/ProductList.vue'

import { useProductsStore } from '@/store/products'
export default {
  name: 'IndexPage',
  components: { TopNav, AddForm, ProductList },
  computed: {
    productsList() {
      const store = useProductsStore()
      return store.products
    },
  },
  created() {
    const store = useProductsStore()

    const data = JSON.parse(localStorage.getItem('products'))
    if (data.length > 0) {
      store.$patch({
        products: data,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  @media (max-width: 1600px) {
    padding: 0 16px;
  }
}
.top-side {
  padding: 0 32px;
  @media (max-width: 1600px) {
    padding: 0 16px;
  }
  @media (max-width: 670px) {
    padding: 0;
  }
}
.content {
  display: flex;
  padding: 0 32px;
  @media (max-width: 1600px) {
    padding: 0 16px;
  }
  @media (max-width: 670px) {
    flex-direction: column;
    padding: 0;
  }
}
.left-side {
  max-width: 332px;
  width: 100%;
  padding-right: 16px;
  @media (max-width: 670px) {
    padding-right: 0;
    margin: 0 auto 16px auto;
  }
}
.right-side {
  max-width: 1028px;
  width: 100%;
}
</style>
