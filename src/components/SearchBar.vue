<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  query: [value: string]
}>()

const query = ref('')
</script>

<template>
  <div class="form-floating">
    <input type="text" class="form-control" id="floatingSearch" placeholder="App Name" v-model="query"
      @input="emit('query', query)">
    <label for="floatingSearch" class="d-flex align-items-center">
      <span class="material-symbols-outlined me-2">
        search
      </span>
      App Name
    </label>
  </div>
</template>
