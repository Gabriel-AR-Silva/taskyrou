<template>
    <nav class="p-4 shadow bg-header">
      <div class="container mx-auto">
        <router-link to="/">
          <span class="text-xl font-bold text-custom-header">Taskyrou</span>
        </router-link>
      </div>
    </nav>
</template>

<style scoped>
  .bg-header {
    background-color: #0F1625;
  }

  .text-custom-header {
    color: rgb(236, 226, 226);
  }
</style>