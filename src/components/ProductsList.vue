<template>
  <div class="list">
    <p class="not-found" v-if="filteredProducts.length == 0">
      Ничего не найдено
    </p>
    <div class="product" v-for="product in filteredProducts" :key="product.id">
      <div
        class="logo"
        :style="{ backgroundImage: `url(${getLogoUrl(product)})` }"
      />
      <div class="content">
        <div class="info py-2">
          <p class="fw-bold fs-5">{{ product.name }}</p>
          <div class="data">
            <span>{{ product.phone }}</span>
            <span>{{ product.email }}</span>
            <a :href="'https://' + product.website" target="_blank">{{
              product.website
            }}</a>
          </div>
        </div>
        <div class="badge-wrapper py-2">
          <span
            :class="`mt-1 badge rounded-pill bg-${
              product.status == 'Premier' ? 'dark' : 'secondary'
            }`"
          >
            {{ product.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/Product'
import { useProductsStore } from '@/store/products'
import algrumImg from '@/assets/logos/algrum.webp'
import ecopackImg from '@/assets/logos/ecopack.webp'
import secureitImg from '@/assets/logos/secureit.webp'
import techproImg from '@/assets/logos/techpro.webp'
import { toRefs } from 'vue'
const productsStore = useProductsStore()
const { filteredProducts } = toRefs(productsStore)

function getLogoUrl(product: Product) {
  const urls: Record<string, string> = {
    ALGRUM: algrumImg,
    EcoPack: ecopackImg,
    SecureIT: secureitImg,
    TechPro: techproImg,
  }
  return urls[product.logo]
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 15px;

  > .not-found {
    text-align: center;
    font-weight: bold;
    @media (min-width: 730px) {
      width: 730px;
    }
  }

  > .product {
    display: flex;
    gap: 30px;
    border-bottom: 1px #d8d8dc solid;
    padding: 15px 0;

    > .logo {
      width: 128px;
      height: 128px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    > .content {
      display: flex;
      gap: 30px;
      flex: 1;

      @media (max-width: 480px) {
        flex-direction: column-reverse;
        gap: 0;
      }

      > .info {
        flex: 1;
        > .data {
          display: flex;
          gap: 15px;
          font-weight: 500;
          align-items: center;

          @media (max-width: 700px) {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      }
    }
  }
}
</style>
