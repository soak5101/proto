<template>
  <div class="flex justify-center mt-8">
    <nav class="flex items-center space-x-2">
      <button
        @click="onPageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border"
        :class="currentPage === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
      >
        前へ
      </button>
      
      <template v-for="page in displayedPages" :key="page">
        <span v-if="page === '...'" class="px-3 py-1">...</span>
        <button
          v-else
          @click="onPageChange(page)"
          class="px-3 py-1 rounded border"
          :class="currentPage === page ? 'bg-primary text-white border-primary' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
        >
          {{ page }}
        </button>
      </template>
      
      <button
        @click="onPageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border"
        :class="currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
      >
        次へ
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number
  totalPages: number
}>();

const emit = defineEmits<{
  pageChange: [page: number]
}>();

const displayedPages = computed(() => {
  const pages = [];
  const maxDisplayed = 5;
  
  if (props.totalPages <= maxDisplayed) {
    // 全ページ数が表示可能数以下の場合は全て表示
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 現在のページの前後に表示するページ数
    const sidePages = Math.floor((maxDisplayed - 3) / 2);
    
    // 最初のページは常に表示
    pages.push(1);
    
    // 現在のページが先頭付近の場合
    if (props.currentPage <= sidePages + 2) {
      for (let i = 2; i <= maxDisplayed - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
    } 
    // 現在のページが末尾付近の場合
    else if (props.currentPage >= props.totalPages - sidePages - 1) {
      pages.push('...');
      for (let i = props.totalPages - (maxDisplayed - 2); i < props.totalPages; i++) {
        pages.push(i);
      }
    } 
    // 現在のページが中央付近の場合
    else {
      pages.push('...');
      for (let i = props.currentPage - sidePages; i <= props.currentPage + sidePages; i++) {
        pages.push(i);
      }
      pages.push('...');
    }
    
    // 最後のページは常に表示
    pages.push(props.totalPages);
  }
  
  return pages;
});

const onPageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('pageChange', page);
  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #4f46e5;
}
.border-primary {
  border-color: #4f46e5;
}
</style> 