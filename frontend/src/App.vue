<script setup>
import { RouterView } from 'vue-router'
import Header from '@/layouts/Header.vue'
</script>

<template>
  <div class="bg-principal flex flex-col h-screen">
    <Header />

    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>

<style>
  .bg-principal {
    background-color: #dbd6d6;
  }
</style>


