<script setup lang="ts">
import { ref } from 'vue';
import AppList from './components/AppList.vue';
import SearchBar from './components/SearchBar.vue'

const query = ref('')

const handleQuery = (value: string) => {
  query.value = value
}
</script>

<template>
  <div class="container mb-4">
    <h1 class="mt-4 text-center">Play Integrity Database</h1>
    <SearchBar class="mt-4" @query="handleQuery" />
    <AppList class="mt-4" :query="query" />
  </div>
</template>
