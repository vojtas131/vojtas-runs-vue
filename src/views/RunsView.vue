<script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  import { storeToRefs } from 'pinia';
  import Run from "../components/Run.vue";

  const store = useUserStore();
  const { runs } = storeToRefs(store);
</script>

<template>
  <main class="runs">
    <v-btn @click="store.fetchRuns">Refresh</v-btn>
    <v-container>
      <v-row v-for="run in runs" class="pa-2">
        <Run :run="run" />
      </v-row>
    </v-container>
  </main>
</template>

<style scoped>
  .runs{
    height: 100%;
    overflow-x: auto;
  }
</style>