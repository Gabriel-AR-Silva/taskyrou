<script setup>
import ModalTask from '@/components/ModalTask.vue'
import TasksList from '@/components/TasksList.vue';
import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';
import EmojiPicker from '@/components/EmojiPicker.vue'

let openModalTaskData = reactive({ openModalTask: false, task: {}})

let configurationData = ref({});

// Reactive object to store tasks
const tasksByList = reactive({
  tasksPending: [],
  tasksDoing: [],
  tasksDone: [],
});

let attributes = ref([]);

const getAllTasks = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/tasks/by-list');
  tasksByList.tasksPending = response.data.tasksPending;
  tasksByList.tasksDoing = response.data.tasksDoing;
  tasksByList.tasksDone = response.data.tasksDone;
}

const getAllAttributes = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/attributes');
  attributes.value = response.data;
  console.log('teste');
  
}

const getConfigurationData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/configurations`);
        configurationData.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const setXpPoints = async (attributeId) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/attributes/add-xp/${attributeId}`,
      {
        xp: 500,
      }
    );
    getAllAttributes();
  } catch (error) {
    console.error('Erro ao atualizar XP:', error.response?.data || error.message);
  }
}

const openModalTask = (emitValue) => {
  openModalTaskData.openModalTask = emitValue.openModalTask;
  openModalTaskData.task = emitValue.task;
}

const closenModalTask = (emitValue) => {
  openModalTaskData.openModalTask = emitValue;
}

onMounted(() => {
  getAllAttributes();
  getAllTasks();
  getConfigurationData();
});
</script>

<template>
  <div id="dashboard" class="container mx-auto mt-5 pb-5 px-2 lg:px-0">
    <h1 class="text-2xl text-start">| Dashboard</h1>

    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 lg:col-span-8">
          <div class="w-full relative bg-white border-grey p-4 rounded-sm mt-5">
            <div class="user_edit" @click="expandUserEditModal"><i class="ph ph-pencil"></i></div>

            <div class="grid grid-cols-12">
              <div class="col-span-12 lg:col-span-4">
                <div class="flex gap-3">
                  <div class="relative img-profile rounded-sm" :style="`background-image: url(${configurationData.user_image})`">
                    <div class="user_emoji"><EmojiPicker /></div>
                    
                  </div>
                  <div class="col-span-8"><h2 class="text-xl">{{ configurationData.user_name }}</h2></div>
                </div>
              </div>

              <div class="col-span-12 lg:col-span-8">
                <ul class="flex flex-wrap items-center gap-1 mt-3 lg:mt-0">
                    <li v-for="attr in attributes" :key="attr._id" class="flex flex-col shadow-xl border-gray-300 border-1 rounded p-1">
                      <span class="text-sm">{{ attr.title }} Lv. {{ attr.level }}</span> 
                      <progress style="height: 5px;" :value="attr.progress_xp" :max="attr.progress_max"></progress>
                    </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="relative phrases-box w-full bg-white border-grey py-1 p-4 rounded-sm mt-3 flex justify-center">
            <span class="text-sm text-gray-500">"{{ configurationData.user_phrases }}"</span> 
          </div>

          <div class="grid grid-cols-12 gap-4 mt-5">
            <TasksList title="Pending" :tasks="tasksByList.tasksPending" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
            <TasksList title="Doing" :tasks="tasksByList.tasksDoing" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
            <TasksList title="Done" :tasks="tasksByList.tasksDone" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="w-full bg-white border-grey p-4 rounded-sm mt-5 text-lg">Tasks</div>
        </div>
    </div>

    <ModalTask v-if="openModalTaskData.openModalTask" :data="openModalTaskData.task" @closeModal="closenModalTask" @dataUpdated="getAllTasks()" />
  </div>
</template>

<style scoped>
  .img-profile {
    width: 70px;
    height: 70px;
    border:2px solid #0F1625;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .user_emoji {
    position: absolute;
    right: -10%;
    bottom: -10%;
    user-select: none;
  }

  .phrases-box {
    background-color: #f5e7df;
    border: 1px solid #be8c5c;
  }

  .phrases-box span{
    color: #be8c5c;
    font-weight: 500;
  }

  .phrases-box::before {
    content: '📜';
    position: absolute;
    left: -2%;
    top: -4%;
    font-size: 1.5rem;
  }

  .user_edit {
    color: rgb(175, 173, 173);
    cursor: pointer;
    border-radius: 2px;
    position: absolute;
    right: .5%;
    top: 0;
    font-size: .8rem;
  }
</style>