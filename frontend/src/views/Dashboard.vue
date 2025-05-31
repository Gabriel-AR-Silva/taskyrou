<script setup>
  import ProfileCard from '@/layouts/ProfileCard.vue';
</script>

<template>
<div>
  <Modal  headerTitle="Edit Profile" ref="expandUserEditModal">
    <FormConfiguration />
  </Modal>

  <div id="dashboard" class="container mx-auto mt-5 pb-5 px-2 lg:px-0">
    <h1 class="text-2xl text-start">| Dashboard</h1>

    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 lg:col-span-8">
          <ProfileCard />
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="w-full bg-white border-grey p-4 rounded-sm mt-5 text-lg">Tasks</div>
        </div>
    </div>
  </div>
</div>
</template>
  