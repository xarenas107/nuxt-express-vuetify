<template lang='pug'>
v-main(align='center' full-height).d-flex.align-center.justify-center
    v-card(width='400' :loading='pending')
        v-card-title Test backend
        v-card-subtitle express api integration
        v-card-text.mt-8
            v-btn(rounded='pill' :loading='pending' @click='execute' color='primary') Test api
            p.mt-4 Response: {{ data }}
</template>

<script setup lang="ts">

const { data, pending, execute } = useLazyFetch('/api/ping',{
    immediate:false
})
pending.value = false

</script>

<style scoped>

</style>