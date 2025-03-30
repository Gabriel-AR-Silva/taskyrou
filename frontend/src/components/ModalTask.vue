<script setup>
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore'
import { defineProps, defineEmits, ref, reactive, onMounted } from 'vue';

const statusList = ref(['pending', 'doing', 'done']);
const textarea = ref(null);

const messageStore = useMessageStore();

let descriptionEdit = ref(false);
let confirmModalAction = ref(false);

const props = defineProps({
  data: {
    type: Object
  }
})

const autoResize = () => {
  const el = textarea.value;
  el.style.height = "auto"; // Reseta a altura
  el.style.height = el.scrollHeight + "px"; // Ajusta para o conteúdo
};

const dataUpdate = reactive({...props.data})

const saveEdit = async () => {
  await axios.put(`http://localhost:3000/api/v1/tasks/${props.data._id}`, dataUpdate);

  // Refresh page's data
  dataUpdatedTask();
}

const taskDelete = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${props.data._id}`);
    messageStore.setMessage(response.data.message)
  
    closeModalTask()
  
    // Refresh page's data
    dataUpdatedTask();
  } catch (error) {
    
  }
}

const saveTitle = async () => {
  // Remove focus
  document.getElementById('titleModal').blur();

  if(dataUpdate.title.trim() === '') {
    // Reset title value
    dataUpdate.title = props.data.title;
  }

  saveEdit();
}

const saveDescription = async () => {
  saveEdit();
  descriptionEdit.value = false;
}

const cancelDescription = async () => {
  // Reset description value
  dataUpdate.description = props.data.description;
  descriptionEdit.value = false;
}

const emit = defineEmits(['closeModal', 'dataUpdated'])

const closeModalTask = () => {
  emit('closeModal', false);
}

const dataUpdatedTask = () => {
  emit('dataUpdated');
}

onMounted(() => {
  autoResize(); 
});
</script>

<template>
    <div class="fade fixed inset-0 flex items-center justify-center bg-gray-500/75 p-3">
      <div class="bg-header p-6 rounded-lg shadow-lg flex flex-col min-w-[95%] md:min-w-[70%] lg:max-w-[60%]">
          <div class="grid grid-cols-6">
              <div class="col-span-6 md:col-span-5 pr-5">
                <label class="text-gray-200 text-sm mr-2" for="titleModal">Title: </label>

                <textarea  
                  class="rounded-sm text-2xl font-semibold text-gray-400 p-2 w-full mb-4 resize-none overflow-hidden"
                  @input="autoResize"
                  maxlength="150"
                  name="titleModal" 
                  id="titleModal" 
                  ref="textarea"
                  rows="1"
                  v-model="dataUpdate.title"
                  @focusout="saveTitle"
                ></textarea>

                <div class="flex flex-col">
                  <label class="text-gray-200 text-sm mr-2" for="statusModal">Status: </label>
                  
                  <select 
                    name="statusModal" 
                    id="statusModal" 
                    class="mt-1 border-2 border-gray-300 rounded-sm pb-1 py-0 text-gray-200 bg-gray-900 shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      hover:bg-gray-700 transition duration-200 cursor-pointer capitalize"
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
                        <small>Edit <i class='bx bxs-edit' ></i></small>
                      </span>
                    </template>

                    <template v-if="descriptionEdit">
                      <div>
                        <div class="icon-edit-task flex gap-3">
                          <button class="text-green-300 hover:text-green-300 cursor-pointer" @click="saveDescription">
                            <small>Save</small>
                          </button>

                          <button class="text-red-300 hover:text-red-300 cursor-pointer" @click="cancelDescription">
                            <small>Cancel</small>
                          </button>
                        </div>
                      </div>
                    </template>
                  </div>
                    <span class="text-gray-200 text-sm mr-2">Description: </span>

                    <p v-if="!descriptionEdit" class="text-gray-400 border-l-2 border-gray-500 pl-3 mt-3">{{ dataUpdate.description }}</p>
                    <p v-if="!descriptionEdit && !dataUpdate.description" class="text-gray-400 border-l-2 border-gray-500 pl-3 mt-3"><small>No description</small></p>

                  <textarea  
                    v-if="descriptionEdit"
                    maxlength="1000"
                    class="border-1 border-gray-500 rounded-sm text-gray-300 p-2 w-full resize-none placeholder:text-gray-300"
                    style="height: 250px" 
                    name="description" 
                    id="description" 
                    rows="3"
                    v-model="dataUpdate.description"
                    placeholder="Describe this task📝..."
                  ></textarea>

                  <p v-if="descriptionEdit" class="text-end text-gray-300">
                    <small>
                      {{ dataUpdate.description ? dataUpdate.description.length : 0 }} / 1000
                    </small>
                  </p>
                </div>
              </div>

              <div class="col-span-6 md:col-span-1 md:border-gray-700 md:border-l-1 md:pl-6 my-5 md:mt-0">
                  <div class="flex flex-col items-start md:items-center">

                    <template v-if="!confirmModalAction">
                      <div class="flex flex-col items-start md:items-center">
                        <h2 class="text-gray-300 mb-3">Actions</h2>

                        <button class="text-gray-200 px-2 py-1 w-full border-2 border-red-600 cursor-pointer max-w-[100px]"  @click="confirmModalAction = true">
                          Delete
                        </button>
                      </div>
                    </template>

                    <template v-if="confirmModalAction">
                        <div class="flex flex-col items-start md:items-center">
                          <h2 class="text-gray-300 mb-3 text-center">Confirm card deletion?</h2>                                                         

                          <button class="text-gray-200 px-2 py-1 w-full border-2 border-green-600 cursor-pointer max-w-[100px] mb-2" @click.prevent="taskDelete">
                            Confirm
                          </button>

                          <button class="text-gray-200 px-2 py-1 w-full border-2 border-red-600 cursor-pointer max-w-[100px]" @click="confirmModalAction = false">
                            Cancel
                          </button>
                        </div>
                    </template>
                  </div>
              </div>

              <div class="col-span-6">
                <div class="mt-4 flex justify-end">
                  <button @click.prevent="closeModalTask" class="px-4 py-1 bg-red-600 text-white rounded-sm cursor-pointer">Close</button>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<style scoped>
    .bg-header {
        background-color: #0F1625;
    }

    .icon-edit-task {
      position: absolute;
      top: 0%;
      right: 1%;
    }

    #statusModal {
      max-width: 90px;
    }
</style>