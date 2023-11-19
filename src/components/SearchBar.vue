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
      <span class="material-symbols-outlined">info</span>
    </button>
  </div>
</template>
