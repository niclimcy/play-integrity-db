<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  query: [value: string]
}>()

const query = ref('')
</script>

<template>
  <div class="input-group">
    <span class="input-group-text">
      <span class="material-symbols-outlined">search</span>
    </span>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingSearch" placeholder="App Name" v-model="query"
        @input="emit('query', query)">
      <label for="floatingSearch">App Name</label>
    </div>
    <button class="btn btn-outline-secondary d-flex align-items-center" type="button" data-bs-toggle="collapse"
      data-bs-target="#collapseInfo" aria-expanded="false" aria-controls="collapseInfo">
      <span class="material-symbols-outlined">help</span>
    </button>
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
</template>
