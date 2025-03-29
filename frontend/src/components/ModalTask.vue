<script setup>
import axios from 'axios';
import { defineProps, defineEmits, ref, reactive } from 'vue';

const statusList = ref(['pending', 'doing', 'done']);
let descriptionEdit = ref(false);

const props = defineProps({
  data: {
    type: Object
  }
})

const dataUpdate = reactive({...props.data})

const saveEdit = async () => {
  document.getElementById('titleModal').blur();
  const response = await axios.put(`http://localhost:3000/api/v1/tasks/${props.data._id}`, dataUpdate);
  descriptionEdit.value = false;
  dataUpdatedTask();
}

const emit = defineEmits(['closeModal', 'dataUpdated'])

const closeModalTask = () => {
  emit('closeModal', false);
}

const dataUpdatedTask = () => {
  emit('dataUpdated');
}
</script>

<template>
    <div class="fade fixed inset-0 flex items-center justify-center bg-gray-500/75 p-3">
      <div class="modal bg-header p-6 rounded-lg shadow-lg flex flex-col">
        <label class="text-gray-200 text-sm mr-2" for="titleModal">Título: </label>
        <input 
          type="text" 
          name="titleModal" 
          id="titleModal" 
          class="text-2xl font-semibold text-gray-400 mb-4 w-100" 
          v-model="dataUpdate.title"
          @keyup.enter="saveEdit"
          @focusout="saveEdit"
        >

        <div class="flex flex-col">
          <label class="text-gray-200 text-sm mr-2" for="statusModal">Status: </label>
          
          <select 
            name="statusModal" 
            id="statusModal" 
            class="border border-gray-300 rounded-sm pb-1 py-0 text-gray-900 bg-white shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              hover:bg-gray-100 transition duration-200 cursor-pointer capitalize"
              v-model="dataUpdate.status"
              @change="saveEdit"
          >
            <option selected default disabled>{{ dataUpdate.status }}</option>
            <option v-for="(statusItem, index) in statusList.filter(s => s !== dataUpdate.status)" 
              :key="index" 
              :value="statusItem"
            >
              {{ statusItem }}
            </option>
          </select>
        </div>

        <div class="relative mt-4">
          <div class="flex items-center" >
            <template v-if="!descriptionEdit">
              <span class="icon-edit-task text-gray-300 hover:text-gray-300 cursor-pointer" @click="() => descriptionEdit = true">
                <small>Editar <i class='bx bxs-edit' ></i></small>
              </span>
            </template>

            <template v-if="descriptionEdit">
              <div>
                <div class="icon-edit-task flex gap-3">
                  <button class="text-green-300 hover:text-green-300 cursor-pointer" @click="saveEdit">
                    <small>Save</small>
                  </button>

                  <button class="text-red-300 hover:text-red-300 cursor-pointer" @click="() => descriptionEdit = false">
                    <small>Cancel</small>
                  </button>
                </div>
              </div>
            </template>
          </div>
            <span class="text-gray-200 text-sm mr-2">Description: </span>

            <p v-if="!descriptionEdit" class="text-gray-400 border-l-2 border-gray-500 pl-3 mt-3">{{ dataUpdate.description }}</p>

          <textarea  
            v-if="descriptionEdit"
            class="border-1 border-gray-500 rounded-sm text-gray-300 p-2"
            style="width: 100%" 
            name="description" 
            id="description" 
            rows="3"
            v-model="dataUpdate.description"
          ></textarea>
        </div>

        <div class="mt-4 flex justify-end">
          <button @click.prevent="closeModalTask" class="px-2 py-1 bg-red-500 text-white rounded-md cursor-pointer">Close</button>
        </div>
      </div>
    </div>
</template>

<style scoped>
    .bg-header {
        background-color: #0F1625;
    }

    .modal {
      width: 45%;
    }

    .icon-edit-task {
      position: absolute;
      top: 1%;
      right: 1%;
    }

    #statusModal {
      max-width: 90px;
    }
</style>