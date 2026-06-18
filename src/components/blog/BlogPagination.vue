<script setup lang="ts">
  import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
  } from 'lucide-vue-next';

  defineProps<{
    currentPage: number;
    totalPages: number;
  }>();

  const emit = defineEmits<{
    (e: 'change', page: number): void;
  }>();

  const handlePageChange = (page: number) => {
    emit('change', page);
  };
</script>

<template>
  <div class="blog-pagination">
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="handlePageChange(1)"
    >
      <ChevronsLeft :size="16" />
    </button>
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
    >
      <ChevronLeft :size="16" />
    </button>

    <div class="page-numbers">
      <button
        v-for="page in totalPages"
        :key="page"
        class="page-number"
        :class="{ active: currentPage === page }"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
    >
      <ChevronRight :size="16" />
    </button>
    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(totalPages)"
    >
      <ChevronsRight :size="16" />
    </button>
  </div>
</template>

<style scoped>
  .blog-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }

  .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.3);
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.5);
  }

  .page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .page-numbers {
    display: flex;
    gap: 4px;
  }

  .page-number {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-number:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .page-number.active {
    background: rgba(58, 90, 74, 0.8);
    color: white;
  }
</style>
