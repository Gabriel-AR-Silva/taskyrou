<script setup>
import ModalTask from '@/components/ModalTask.vue'
import TasksList from '@/components/TasksList.vue';
import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';

let openModalTaskData = reactive({ openModalTask: false, task: {}})

const user_emoji = '🎶';

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
});
</script>

<template>
  <div id="dashboard" class="container mx-auto mt-5 pb-5">
    <h1 class="text-2xl text-start">| Dashboard</h1>

    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-8">
          <div class="w-full bg-white border-grey p-4 rounded-sm mt-5">
            <div class="grid grid-cols-12">
              <div class="col-span-12 md:col-span-4">
                <div class="flex gap-3">
                  <div class="relative img-profile rounded-sm">
                    <div class="user_emoji">{{ user_emoji }}</div>
                  </div>
                  <div class="col-span-8"><h2 class="text-xl">Gabriel ADM</h2></div>
                </div>
              </div>

              <div class="col-span-12 md:col-span-8">
                <ul class="flex items-center gap-4">
                    <li v-for="attr in attributes" :key="attr._id" class="flex flex-col shadow-xl border-gray-300 border-1 rounded p-1">
                      <span class="text-sm">{{ attr.title }} Lv. {{ attr.level }}</span> 
                      <progress style="height: 5px;" :value="attr.progress_xp" :max="attr.progress_max"></progress>
                    </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-12 gap-4 mt-5 px-3 md:px-0">
            <TasksList title="Pending" :tasks="tasksByList.tasksPending" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
            <TasksList title="Doing" :tasks="tasksByList.tasksDoing" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
            <TasksList title="Done" :tasks="tasksByList.tasksDone" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
          </div>
        </div>

        <div class="col-span-4">
          <div class="w-full bg-white border-grey p-4 rounded-sm mt-5">Tasks</div>
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
    background-image: url('https://cdn.hero.page/pfp/43b4708b-ad35-4028-9f46-df136e43ea6f-monochrome-male-anime-profile-anime-profile-picture-black-and-white-male-1.png');
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
</style>