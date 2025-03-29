<script setup>
import axios from 'axios';
import { defineProps, ref, defineEmits } from 'vue';

// Definindo os eventos que o componente pode emitir
const emit = defineEmits(['openModalTask', 'dataUpdated']);

const statusList = ref(['pending', 'doing', 'done']);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        default: () => []
    }
})

const saveEdit = async (data = null) => {
  const response = await axios.put(`http://localhost:3000/api/v1/tasks/${data._id}`, data);
  dataUpdatedTask();
}

const saveCreate = async () => {
    let data = {};
    data.title = 'New Task';
    data.status = props.title.toLowerCase();

  const response = await axios.post(`http://localhost:3000/api/v1/tasks`, data);
  dataUpdatedTask();
  sendEmitModalTask(response.data);
  console.log(response);
}

const dataUpdatedTask = () => {
  emit('dataUpdated');
}

const sendEmitModalTask = (task) => {
  emit('openModalTask', {openModalTask: true, task: task});
};
</script>

<template>
    <div class="relative col-span-4 px-2 text-center bg-header pt-0 p-6 rounded-lg shadow-lg">
        <i class='icon-add-task bx bx-plus bx-sm cursor-pointer' @click.prevent="saveCreate()"></i>

        <h2 class="text-2xl font-medium mb-2 text-white py-2 lh-0">{{ title }}</h2>

        <div class="scrool-list px-2 h-100">
            <div v-for="task in tasks" :key="task.id" class="mx-auto card-custom bg-gray-100 max-w-sm border border-gray-400 rounded-md mt-3">
                <span @click.prevent="sendEmitModalTask(task)" class="cursor-pointer">{{ task.title }}</span>

                <select 
                    name="status" 
                    id="status" 
                    class="border border-gray-300 rounded-sm px-3 pb-2 py-1 text-gray-700 bg-gray-100 shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        hover:bg-gray-100 transition duration-200 cursor-pointer capitalize"
                    @change="saveEdit(task)"
                    v-model="task.status"
                >
                    <option selected default disabled>{{ task.status }}</option>
                    <option v-for="(statusItem, index) in statusList.filter(s => s !== task.status)" 
                        :key="index" 
                        :value="statusItem">
                        {{ statusItem }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card-custom {
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 1rem;
        gap: 5rem;
    }

    .scrool-list {
        background-color: rgba(255, 255, 255, 0.051);
        overflow-y: scroll;
        max-height: calc(100vh - 300px);
        border-radius: 10px;
    }

    @layer utilities {
        .scrool-list::-webkit-scrollbar {
            width: 6px;
        }

        .scrool-list::-webkit-scrollbar-track {
            background: #1c1f27;
            border-radius: 10px;
        }

        .scrool-list::-webkit-scrollbar-thumb {
            background: oklch(0.623 0.214 259.815 / .5);
            border-radius: 10px;
        }

        .scrool-list::-webkit-scrollbar-thumb:hover {
            background: oklch(0.503 0.214 259.815 / .6);
        }
    }

    .icon-add-task {
        position: absolute;
        top: 1%;
        right: 1%;
        color: #DBD6D6;
    }

    .bg-header {
        background-color: #0F1625;
    }
</style>