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
    <h1 class="mt-4 text-center display-4">Play Integrity DB</h1>
    <SearchBar class="mt-4" @query="handleQuery" />
    <AppList class="mt-4" :query="query" />
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

  h1 {
    font-family: 'Noto Sans', sans-serif;
  }
</style>
