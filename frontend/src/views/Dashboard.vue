<script setup>
  import ProfileCard from '@/layouts/ProfileCard.vue';
  import TaskCard from '@/components/TaskCard.vue';
  import Schedule from '@/components/Schedule.vue';
  import { ref } from 'vue';

  let activePage = ref('schedule');
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

          <div class="mt-3 ">
            <div class="w-full border-grey rounded-md mb-1 text-lg flex items-center gap-5 bg-white p-1" style="border-left: 3px solid #0F1625;">
              <button 
                @click="activePage = 'schedule'"
                :class="[
                  {'font-bold text-dark-color-blue': activePage === 'schedule'},
                  {'font-regular': activePage != 'schedule'}
                ]" 
                class="text-sm  p-1 rounded flex items-center gap-1 cursor-pointer"
              >
                  📅 Schedule
              </button> 
              |
              <button 
                @click="activePage = 'lists'"
                :class="[
                  {'font-bold text-dark-color-blue': activePage === 'lists'},
                  {'font-regular': activePage != 'lists'}
                ]" 
                class="text-sm  p-1 rounded flex items-center gap-1 cursor-pointer"
              >
                📋 Lists
              </button>
            </div>

              <template v-if="activePage === 'schedule'">
                <Schedule />
              </template>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="w-full bg-white border-grey py-1 p-2 rounded-sm mb-1 text-md font-medium mt-5" style="border-left: 3px solid #0F1625;">
            <h2 class="text-xl text-start">| Tasks</h2>

            <div class="p-1 w-full overflow-y-scroll flex flex-col gap-3 pt-5">
              <TaskCard />
              <TaskCard />
              <TaskCard />
              <TaskCard />
              <TaskCard />
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.text-dark-color-blue {
  color: #0F1625; 
}
</style>
  