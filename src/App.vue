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
    <div class="mt-4 text-center">
      <img src="/favicon/favicon.svg" class="img" alt="Play Integrity DB" style="width: 4rem">
      <h1 class="display-4">Play Integrity DB</h1>
    </div>
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
