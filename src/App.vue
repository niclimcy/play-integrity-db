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
    <div class="mt-4 g-2">
      <SearchBar @query="handleQuery" />
    </div>
    <div class="collapse mt-4" id="collapseInfo">
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-success-subtle d-flex align-items-center">
            <span class="material-symbols-outlined me-2">check_circle</span>
            No checks - No known checks that prevent app usage.
          </li>
          <li class="list-group-item bg-primary-subtle d-flex align-items-center">
            <span class="material-symbols-outlined me-2">info</span>
            Root Check - Checks if the device is rooted.
          </li>
          <li class="list-group-item bg-warning-subtle d-flex align-items-center">
            <span class="material-symbols-outlined me-2">warning</span>
            Device integrity - Checks if device's CTS profile matches.
          </li>
          <li class="list-group-item bg-danger-subtle d-flex align-items-center">
            <span class="material-symbols-outlined me-2">dangerous</span>
            Strong integrity - Does a hardware backed attestation check.
          </li>
          <li class="list-group-item bg-danger-subtle d-flex align-items-center">
            <span class="material-symbols-outlined me-2">dangerous</span>
            Bootloader Check - Checks if the device's bootloader is unlocked.
          </li>
        </ul>
      </div>
    </div>
    <AppList class="mt-4" :query="query" />
    <div v-if="query" class="alert alert-info alert-dismissible fade show mt-4" role="alert">
      <h4 class="alert-heading d-flex align-items-center">
        <span class="material-symbols-outlined me-2">info</span>
        Don't see your app?
      </h4>
      <hr>
      <p class="mb-0">Contribute to our GitHub
        <a href="https://github.com/niclimcy/play-integrity-db" class="alert-link">here</a>!
      </p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>
