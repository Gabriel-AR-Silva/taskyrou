<script setup>
import ModalTask from '@/components/ModalTask.vue'
import TasksList from '@/components/TasksList.vue';
import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';

let openModalTaskData = reactive({ openModalTask: false, task: {}})

// Reactive object to store tasks
const tasksByList = reactive({
  tasksPending: [],
  tasksDoing: [],
  tasksDone: [],
});

const getAllTasks = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/tasks/by-list');
  tasksByList.tasksPending = response.data.tasksPending;
  tasksByList.tasksDoing = response.data.tasksDoing;
  tasksByList.tasksDone = response.data.tasksDone;
}

const openModalTask = (emitValue) => {
  openModalTaskData.openModalTask = emitValue.openModalTask;
  openModalTaskData.task = emitValue.task;
}

const closenModalTask = (emitValue) => {
  openModalTaskData.openModalTask = emitValue;
}

onMounted(() => {
  getAllTasks();
});
</script>

<template>
  <div id="dashboard" class="container mx-auto mt-5 pb-5">
    <h1 class="text-2xl text-start pl-3">| Dashboard</h1>

    <div class="grid grid-cols-12 gap-4 mt-5 px-3">
      <TasksList title="Pending" :tasks="tasksByList.tasksPending" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
      <TasksList title="Doing" :tasks="tasksByList.tasksDoing" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
      <TasksList title="Done" :tasks="tasksByList.tasksDone" @openModalTask="openModalTask" @dataUpdated="getAllTasks()" />
    </div>

    <ModalTask v-if="openModalTaskData.openModalTask" :data="openModalTaskData.task" @closeModal="closenModalTask" @dataUpdated="getAllTasks()" />
  </div>
</template>