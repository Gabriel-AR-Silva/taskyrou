<script setup>
import { useMessageStore } from '@/stores/messageStore'
import { reactive, ref } from 'vue';
import axios from  'axios';

const messageStore = useMessageStore();

let activePage = ref('geral');

const menus = [
  {
    title: 'Geral',
    page: 'geral',
  },
  {
    title: 'Attributes',
    page: 'attributes',
  },
  {
    title: 'Apperance',
    page: 'apperance',
  },
];

const form = reactive({
  title: '',
  active: true
})

const formSubmit = async () => {
  console.log(form);
  try {    
    const response = await axios.post(`http://localhost:3000/api/v1/attributes`, form);

    form.title = '';
    form.active = true;

    messageStore.setMessage(response.data.message)
  } catch (error) {
    messageStore.setMessage(error.message)
    console.log(error.message)
  }
}
</script>


<template>
  <div id="configuration" class="container mx-auto mt-5 pb-5">
    <h1 class="text-2xl text-start">| Configuration</h1>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <div class="col-span-12 md:col-span-4">
        <div class="w-full p-3 bg-white rounded border-grey">
          <ul class="flex flex-col gap-1">
            <li 
              v-for="(menu, index) in menus" 
              :key="index" 
              class="px-3 group border border-gray-400 p-2 rounded-sm cursor-pointer flex justify-between items-center transition-colors duration-150"
              :class="{
                'border-gray-600 text-gray-600 bg-blue-50': activePage === menu.page,
                'text-gray-400 hover:text-gray-600 hover:border-gray-600': activePage !== menu.page
              }"
              @click="activePage = menu.page"
            >
              {{ menu.title }}
              <i class="ph ph-arrow-circle-right text-[1.4rem] transform transition-transform duration-200 group-hover:translate-x-1"></i>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-span-12 md:col-span-8">
        <template v-if="activePage == 'geral'">
          <!-- Nothing here yet -->
          <span>Nothing here yet</span>
        </template>
        
        <template v-if="activePage == 'attributes'">
          <div class="w-full p-3 bg-white rounded-sm border-grey">
            <h2 class="text-2xl text-center">Create Attributes</h2>
      
            <form @submit.prevent="formSubmit" method="post" class="max-w-xl mx-auto p-6 space-y-6">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  v-model="form.title"
                  id="title"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Title"
                />
              </div>
      
              <div class="flex gap-1">
                <label for="active" class="block text-sm font-medium text-gray-700 mb-1">Active</label>
                <input type="checkbox" name="active" id="active" v-model="form.active">
              </div>
      
              <div class="text-right">
                <button
                  type="submit"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition shadow cursor-pointer"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </template>

        <template v-if="activePage == 'apperance'">
          <!-- Nothing here yet -->
           <span>Nothing here yet</span>
        </template>
      </div>
    </div>
  </div>
</template>