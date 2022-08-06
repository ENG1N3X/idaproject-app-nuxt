<template>
  <div class="select" :class="getProductsLength <= 1 && 'disabled'">
    <span class="select__current" @click="toggleSelect">{{
      currentFilter.text
    }}</span>
    <div class="select__dropdown" :class="isOpen && 'active'">
      <ul class="select__list">
        <li
          v-for="filter in filters"
          :key="filter.text"
          :data-value="filter.value"
          class="select__list-item"
          :class="currentFilter.value === filter.value && 'current'"
          @click="setFilter(filter)"
        >
          {{ filter.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useProductsStore } from '@/store/products'

export default {
  name: 'SelectFilter',
  data() {
    return {
      filters: [
        {
          value: 'default',
          text: 'По умолчанию',
        },
        {
          value: 'minmax',
          text: 'От min к max',
        },
        {
          value: 'maxmin',
          text: 'От max к min',
        },
        {
          value: 'by_name',
          text: 'По наименованию',
        },
      ],
      currentFilter: {
        value: 'default',
        text: 'По умолчанию',
      },
      initialArray: [],
      isOpen: false,
    }
  },
  computed: {
    getProductsLength() {
      const store = useProductsStore()
      return store.products.length
    },
  },
  mounted() {
    const store = useProductsStore()
    this.initialArray = JSON.parse(JSON.stringify(store.products))
  },
  methods: {
    toggleSelect() {
      if (this.getProductsLength > 0) {
        this.isOpen = !this.isOpen
      }
    },
    setFilter({ value, text }) {
      this.currentFilter = {
        value,
        text,
      }

      const store = useProductsStore()

      switch (this.currentFilter.value) {
        case 'default':
          store.$patch({
            products: this.initialArray,
          })

          break
        case 'by_name':
          store.products.sort((a, b) => (a.name < b.name ? -1 : 1))

          break
        case 'minmax':
          store.products.sort(
            (a, b) =>
              Number(a.price.replace(/\s+/g, '')) -
              Number(b.price.replace(/\s+/g, ''))
          )

          break
        case 'maxmin':
          store.products.sort(
            (a, b) =>
              Number(b.price.replace(/\s+/g, '')) -
              Number(a.price.replace(/\s+/g, ''))
          )

          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  display: block;
  position: relative;
  z-index: 5;

  text-align: left;
  white-space: nowrap;

  cursor: pointer;

  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  padding: 0 16px;

  transition: all 0.2s ease-in-out;

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  .select__current {
    display: block;
    font-size: 12px;
    line-height: 40px;
    color: #b4b4b4;
  }
  .select__dropdown {
    position: absolute;
    top: 100%;
    left: auto;
    right: 0;
    z-index: 5;

    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #4444441c;

    margin-top: 5px;

    transition: all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out;
    transform: scale(0);
    opacity: 0;
    &.active {
      transform: scale(1);
      opacity: 1;
    }

    .select__list {
      border-radius: 5px;
      max-height: 210px;
      overflow: hidden;
      overflow-y: auto;
      padding: 0;
      .select__list-item {
        display: block;
        cursor: pointer;
        font-size: 14px;
        line-height: 25px;
        list-style: none;
        padding: 0 16px;
        text-align: left;
        transition: all 0.2s ease-out;
        &.current {
          font-weight: 600;
        }
        &:hover {
          background: #f6f6f6;
        }
      }
    }
  }
}
</style>
