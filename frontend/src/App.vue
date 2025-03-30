<script setup>
import { RouterView } from 'vue-router'
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
</script>

<template>
  <div class="relative bg-principal flex flex-col h-screen">
    <Header />

    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style>
  .bg-principal {
    background-color: #dbd6d6;
  }
</style>


