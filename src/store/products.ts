import type { Product } from '@/interfaces/Product'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import productsData from '@/assets/products.json'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(productsData)
  const filteredProducts = ref<Product[]>(productsData)

  function getFiltersInitialState() {
    return {
      country: null as string | null,
      city: null as string | null,
      productType: null as string | null,
      products: null as string | null,
      partnerType: [] as string[],
    }
  }
  const filters = reactive(getFiltersInitialState())

  function resetFilters() {
    Object.assign(filters, getFiltersInitialState())
    applyFilters()
  }

  function applyFilters() {
    filteredProducts.value = products.value.filter(product => {
      for (const [key, filterValue] of Object.entries(filters)) {
        if (filterValue == null) continue
        if (Array.isArray(filterValue) && filterValue.length == 0) continue

        const value = product[key as keyof Product]
        if (typeof filterValue == 'string' && typeof value == 'string') {
          if (value !== filterValue) return false
        }
        if (typeof filterValue == 'string' && Array.isArray(value)) {
          if (!value.includes(filterValue)) return false
        }
        if (Array.isArray(filterValue) && typeof value == 'string') {
          if (!filterValue.includes(value)) return false
        }
        if (Array.isArray(filterValue) && Array.isArray(value)) {
          if (!filterValue.some(fv => value.includes(fv))) return false
        }
      }
      return true
    })
  }

  type FiltersStringArrayFields = {
    [K in keyof typeof filters]: (typeof filters)[K] extends string[]
      ? K
      : never
  }[keyof typeof filters]

  type FiltersNullableStringFields = {
    [K in keyof typeof filters]: (typeof filters)[K] extends string | null
      ? K
      : never
  }[keyof typeof filters]

  function toggleFilterTag(tag: string, field: FiltersStringArrayFields) {
    if (filters[field].includes(tag)) {
      filters[field] = filters[field].filter(item => item !== tag)
    } else {
      filters[field].push(tag)
    }
  }
  function toggleFilterType(type: string, field: FiltersNullableStringFields) {
    if (filters[field] == type) filters[field] = null
    else filters[field] = type
  }

  const availableFilterFields = computed(() => {
    const keys = products.value.flatMap(product => Object.keys(product))
    const fields = {} as Record<keyof Product, string[]>

    keys.forEach(key => {
      fields[key as keyof Product] = [
        ...new Set(
          products.value
            .flatMap(product => product[key as keyof Product])
            .filter((value): value is string => typeof value == 'string')
        ),
      ]
    })
    return fields
  })

  return {
    products,
    filteredProducts,
    applyFilters,
    availableFilterFields,
    filters,
    resetFilters,
    toggleFilterTag,
    toggleFilterType,
  }
})
