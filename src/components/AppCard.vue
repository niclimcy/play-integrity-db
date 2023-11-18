<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  appId: string
}>()

const appDetails = ref<any>({})
const noChecks = ref(false)

onMounted(async () => {
  const response = await fetch(`/data/${props.appId}`)
  appDetails.value = await response.json()

  if (!appDetails.value.deviceIntegrity &&
    !appDetails.value.strongIntegrity &&
    !appDetails.value.rootCheck &&
    !appDetails.value.bootloaderCheck) {
    noChecks.value = true
  }
})
</script>

<template>
  <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="card">
      <img :src="appDetails.iconURL" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{ appDetails.name }}</h5>
        <p class="card-text">
          {{ appDetails.packageId }}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li v-if="noChecks" class="list-group-item bg-success-subtle d-flex align-items-center">
          <span class="material-symbols-outlined me-2">
            check_circle
          </span>
          No checks
        </li>
        <li v-if="appDetails.rootCheck" class="list-group-item bg-primary-subtle d-flex align-items-center">
          <span class="material-symbols-outlined me-2">
            info
          </span>
          Root Check
        </li>
        <li v-if="appDetails.deviceIntegrity" class="list-group-item bg-warning-subtle d-flex align-items-center">
          <span class="material-symbols-outlined me-2">
            warning
          </span>
          Device integrity
        </li>
        <li v-if="appDetails.strongIntegrity" class="list-group-item bg-danger-subtle d-flex align-items-center">
          <span class="material-symbols-outlined me-2">
            error
          </span>
          Strong integrity
        </li>
        <li v-if="appDetails.bootloaderCheck" class="list-group-item bg-danger-subtle d-flex align-items-center">
          <span class="material-symbols-outlined me-2">
            error
          </span>
          Bootloader Check
        </li>
      </ul>
    </div>
  </div>
</template>
