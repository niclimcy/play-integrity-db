<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import TrieSearch from 'trie-search'
import AppCard from './AppCard.vue'

const props = defineProps<{
  query: string
}>()

const appMap = ref({})
const appData = ref<Array<Object>>([])
const packageIds = ref<Array<string>>([])

const trie = new TrieSearch('name')

onMounted(async () => {
  const response = await fetch("/data/apps.json")
  appMap.value = await response.json()
  appData.value = Object.entries(appMap.value).map(([id, name]) => ({ id, name }))
  trie.addAll(appData.value)
})

watch(() => props.query, (query) => {
  const results = trie.get(query)
  packageIds.value = (results as { id: string }[]).map(app => app.id)
})
</script>

<template>
  <div class="row">
    <AppCard v-for="id in packageIds" :key="id" :appId="id" />
  </div>
</template>
