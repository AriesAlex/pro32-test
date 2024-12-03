<template>
  <div id="home-view">
    <div class="center">
      <h1 class="text-center fw-bold">Где купить</h1>
      <p class="subtitle text-center fw-medium">Контакты наших партнёров</p>
      <div class="content">
        <div class="filters">
          <ProductsFilters />
        </div>
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductsFilters from '@/components/ProductsFilters.vue'
import ProductsList from '@/components/ProductsList.vue'
</script>

<style lang="scss" scoped>
#home-view {
  display: flex;
  justify-content: safe center;
  min-height: 100vh;
  width: 100%;
  padding: 45px 15px;
  box-sizing: border-box;

  > .center {
    > .content {
      margin-top: 45px;
      display: flex;
      gap: 80px;

      @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
