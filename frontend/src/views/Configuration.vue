<script setup>
import { useMessageStore } from '@/stores/messageStore'
import { reactive } from 'vue';
import axios from  'axios';

const messageStore = useMessageStore();

const form = reactive({
  title: '',
  active: true
})

const formSubmit = async () => {
  console.log(form);
  
  const response = await axios.post(`http://localhost:3000/api/v1/attributes`, form);
  messageStore.setMessage(response.data.message)
}
</script>


<template>
  <div id="configuration" class="container mx-auto mt-5 pb-5">
    <h1 class="text-2xl text-start">| Configuration</h1>
    
    <div class="w-full p-3 bg-white rounded border-grey my-5">
      <h2 class="text-xl text-center">Create Attributes</h2>

       <form method="post" class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
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

        <div>
          <label for="active" class="block text-sm font-medium text-gray-700 mb-1">Active</label>
          <input type="checkbox" name="active" id="active" v-model="form.active">
        </div>

        <div class="text-right">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition shadow cursor-pointer"
            @click.prevent="formSubmit()"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>