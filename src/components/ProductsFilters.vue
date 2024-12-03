<template>
  <div class="filters">
    <div class="title">Уточните адрес</div>

    <select class="form-select" v-model="filters.country">
      <option :value="null" selected>Страна</option>
      <option
        v-for="country in availableFilterFields.country"
        :value="country"
        :key="country"
      >
        {{ country }}
      </option>
    </select>

    <select class="form-select" v-model="filters.city">
      <option :value="null" selected>Город</option>
      <option
        v-for="city in availableFilterFields.city"
        :value="city"
        :key="city"
      >
        {{ city }}
      </option>
    </select>

    <div class="title">Выберите тип продукта</div>
    <div class="tags">
      <span
        v-for="productType in availableFilterFields.productType"
        class="tag"
        :class="{ active: filters.productType == productType }"
        @click="toggleFilterType(productType, 'productType')"
        :key="productType"
      >
        {{ productType }}
      </span>
    </div>

    <div class="title">Выберите продукт</div>
    <div class="tags">
      <span
        v-for="product in availableFilterFields.products"
        class="tag"
        :class="{ active: filters.products == product }"
        @click="toggleFilterType(product, 'products')"
        :key="product"
      >
        {{ product }}
      </span>
    </div>

    <div class="title">Выберите тип партнёра</div>
    <div class="tags">
      <span
        v-for="partnerType in availableFilterFields.partnerType"
        class="tag"
        :class="{ active: filters.partnerType.includes(partnerType) }"
        @click="toggleFilterTag(partnerType, 'partnerType')"
        :key="partnerType"
      >
        {{ partnerType }}
      </span>
    </div>

    <div class="d-flex gap-2">
      <button
        type="button"
        class="btn btn-outline-dark w-100 py-2"
        @click="resetFilters"
      >
        Очистить
      </button>
      <button
        type="button"
        class="btn btn-primary w-100 py-2"
        @click="applyFilters"
      >
        Найти
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products'
import { toRefs } from 'vue'
const productsStore = useProductsStore()
const {
  applyFilters,
  availableFilterFields,
  filters,
  resetFilters,
  toggleFilterTag,
  toggleFilterType,
} = toRefs(productsStore)
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: sticky;
  top: 30px;

  @media (min-width: 600px) {
    width: 380px;
  }

  > .title {
    font-weight: 400;
    font-size: 14px;
    color: #9999a2;
  }

  > .tags {
    .tag {
      display: inline-block;
      background-color: rgb(230, 230, 232);
      border-radius: 16px;
      transition: 0.2s all;
      color: rgb(30, 40, 49);
      padding: 5px 14px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      font-size: 14px;
      font-weight: 500;

      &:hover {
        background-color: rgb(209, 209, 209);
      }
      &.active {
        background-color: #26263a;
        color: rgb(215, 215, 215);
      }
    }
  }
}
</style>
