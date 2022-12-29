<script setup lang="ts">
    import type { FinalRun } from '@/types/types';

    const props = defineProps<{
        run: FinalRun,
    }>();
</script>

<template>
    <v-card :key="props.run.id">
        {{ props.run.game }}
        {{ props.run.time }}
        {{ props.run.comment }}
        {{ props.run.category }}
    </v-card>
</template>