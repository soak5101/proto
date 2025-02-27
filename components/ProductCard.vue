<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="h-48 overflow-hidden">
      <img :src="product.imageUrl" :alt="product.itemName" class="w-full h-full object-cover" />
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-1">
        <div class="text-xs text-gray-500">{{ product.shopName }}</div>
        <div class="flex items-center text-xs">
          <span class="text-yellow-500 mr-1">★</span>
          <span>{{ product.reviewAverage || '評価なし' }}</span>
          <span class="ml-1 text-gray-500">({{ product.reviewCount || 0 }})</span>
        </div>
      </div>
      <h3 class="font-semibold mb-2 line-clamp-2">{{ product.itemName }}</h3>
      <div class="flex justify-between items-center">
        <span class="font-bold text-lg">¥{{ formatPrice(product.itemPrice) }}</span>
        <a 
          :href="product.itemUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-sm text-primary hover:underline"
        >
          詳細を見る
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/utils/types';

defineProps<{
  product: Product
}>();

const formatPrice = (price: number): string => {
  return price.toLocaleString();
};
</script>

<style scoped>
.text-primary {
  color: #4f46e5;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 