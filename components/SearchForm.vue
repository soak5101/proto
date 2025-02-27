<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="space-y-2">
        <label for="keyword" class="block text-sm font-medium">キーワード</label>
        <input
          id="keyword"
          v-model="searchParams.keyword"
          type="text"
          placeholder="商品名を入力"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div class="space-y-2">
        <label for="genreId" class="block text-sm font-medium">カテゴリー</label>
        <select
          id="genreId"
          v-model="searchParams.genreId"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">すべてのカテゴリー</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      
      <div class="space-y-2">
        <label for="priceRange" class="block text-sm font-medium">価格帯</label>
        <select
          id="priceRange"
          v-model="searchParams.priceRange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">指定なし</option>
          <option value="0-1000">1,000円以下</option>
          <option value="1000-5000">1,000円〜5,000円</option>
          <option value="5000-10000">5,000円〜10,000円</option>
          <option value="10000-">10,000円以上</option>
        </select>
      </div>
    </div>
    
    <div class="flex justify-end mt-4">
      <button
        @click="resetSearch"
        class="px-4 py-2 mr-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
      >
        リセット
      </button>
      <button
        @click="search"
        class="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary-dark"
        :disabled="isLoading"
      >
        <span v-if="isLoading">検索中...</span>
        <span v-else>検索する</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { SearchParams } from '~/utils/types';

const props = defineProps<{
  isLoading: boolean
}>();

const emit = defineEmits<{
  search: [params: SearchParams]
  reset: []
}>();

const searchParams = reactive<SearchParams>({
  keyword: '',
  genreId: '',
  priceRange: '',
  page: 1
});

// 楽天のジャンルID（簡易版）
const genres = [
  { id: '100371', name: 'レディースファッション' },
  { id: '551177', name: 'メンズファッション' },
  { id: '100533', name: '腕時計・アクセサリー' },
  { id: '100227', name: '食品・スイーツ・お取り寄せ' },
  { id: '100316', name: 'キッチン・生活雑貨・日用品' },
  { id: '100804', name: 'インテリア・家具・収納' },
  { id: '101070', name: '家電・カメラ・オーディオ' },
  { id: '100938', name: 'パソコン・スマホ・周辺機器' },
  { id: '101205', name: '本・音楽・DVD' },
  { id: '100533', name: 'ゲーム・おもちゃ・ホビー' }
];

const search = () => {
  emit('search', { ...searchParams });
};

const resetSearch = () => {
  searchParams.keyword = '';
  searchParams.genreId = '';
  searchParams.priceRange = '';
  searchParams.page = 1;
  emit('reset');
};
</script>

<style scoped>
.bg-primary {
  background-color: #4f46e5;
}
.bg-primary-dark {
  background-color: #4338ca;
}
.ring-primary {
  --tw-ring-color: #4f46e5;
}
</style> 