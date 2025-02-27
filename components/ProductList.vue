<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">検索結果: {{ totalCount }}件</h2>
      <div class="flex items-center">
        <label for="sort" class="mr-2 text-sm">並び替え:</label>
        <select
          id="sort"
          v-model="sortOption"
          @change="handleSortChange"
          class="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="standard">標準</option>
          <option value="+itemPrice">価格の安い順</option>
          <option value="-itemPrice">価格の高い順</option>
          <option value="-reviewAverage">レビュー評価順</option>
        </select>
      </div>
    </div>
    
    <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.itemCode"
        :product="product"
      />
    </div>
    
    <div v-else class="bg-white p-8 rounded-lg shadow-md text-center">
      <p class="text-lg text-gray-600">検索条件に一致する商品が見つかりませんでした。</p>
      <p class="mt-2 text-sm text-gray-500">検索条件を変更して、再度お試しください。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Product } from '~/utils/types';

const props = defineProps<{
  products: Product[]
  totalCount: number
}>();

const emit = defineEmits<{
  sort: [sortOption: string]
}>();

const sortOption = ref('standard');

const handleSortChange = () => {
  emit('sort', sortOption.value);
};

// Reset sort option when products change
watch(() => props.products, () => {
  sortOption.value = 'standard';
}, { deep: true });
</script> 