<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">楽天商品検索</h1>
    
    <!-- 検索フォーム -->
    <SearchForm 
      :isLoading="isLoading" 
      @search="handleSearch" 
      @reset="handleReset" 
    />
    
    <!-- エラーメッセージ -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      <p>{{ error }}</p>
    </div>
    
    <!-- 検索結果 -->
    <div v-if="hasSearched">
      <ProductList 
        :products="products" 
        :totalCount="totalCount" 
        @sort="handleSort" 
      />
      
      <!-- ページネーション -->
      <Pagination 
        v-if="totalPages > 1" 
        :currentPage="currentPage" 
        :totalPages="totalPages" 
        @pageChange="handlePageChange" 
      />
    </div>
    
    <!-- ローディング表示 -->
    <LoadingIndicator v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SearchParams } from '~/utils/types';
import { useRakutenApi } from '~/composables/useRakutenApi';

const {
  products,
  isLoading,
  error,
  totalCount,
  totalPages,
  currentPage,
  searchProducts,
  sortProducts
} = useRakutenApi();

const hasSearched = ref(false);
const currentSearchParams = ref<SearchParams>({
  keyword: '',
  genreId: '',
  priceRange: '',
  page: 1
});

const handleSearch = async (params: SearchParams) => {
  currentSearchParams.value = { ...params };
  await searchProducts(params);
  hasSearched.value = true;
};

const handleReset = () => {
  hasSearched.value = false;
};

const handleSort = (sortOption: string) => {
  sortProducts(sortOption);
};

const handlePageChange = async (page: number) => {
  currentSearchParams.value.page = page;
  await searchProducts(currentSearchParams.value);
  // ページトップにスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// デバッグ用
const config = useRuntimeConfig();
console.log('環境変数:', config.public.rakutenAppId);
</script>

<style>
.bg-primary {
  background-color: #4f46e5;
}
.text-primary {
  color: #4f46e5;
}
</style> 