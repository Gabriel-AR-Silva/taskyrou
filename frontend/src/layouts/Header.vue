<template>
  <nav class="bg-[#0F1625] text-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-gray-100 hover:text-gray-300 transition">
        🌚Taskyrou
      </router-link>

      <!-- Navegação -->
      <ul class="flex items-center gap-x-6">
        <li>
          <router-link to="/dashboard" class="font-semibold text-gray-100 hover:text-gray-300 transition">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/configuration" class="font-semibold text-gray-100 hover:text-gray-300 transition">
            Configuration
          </router-link>
        </li>
      </ul>
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