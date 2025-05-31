<script setup>
import FormConfiguration from '@/components/Configuration/FormConfiguration.vue';
import AttributeList from '@/components/Attribute/AttributeList.vue';

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
      <div class="col-span-12 md:col-span-2">
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

      <div class="col-span-12 md:col-span-10">
        <template v-if="activePage == 'geral'">
          <div class="w-full p-3 bg-white rounded-sm border-grey">
            <h2 class="text-2xl text-center">Information</h2>
      
            <FormConfiguration />
          </div>
        </template>
        
        <template v-if="activePage == 'attributes'">
          <div class="w-full p-3 bg-white rounded-sm border-grey">
            <h2 class="font-bold text-2xl text-center mb-5">Attributes List</h2>
      
            <AttributeList />
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