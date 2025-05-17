<script setup>
import { useMessageStore } from '@/stores/messageStore'
import axios from 'axios';
import { defineProps, defineEmits, ref, watch } from 'vue';
import draggable from 'vuedraggable';

const messageStore = useMessageStore();
const drag = ref(false);

const emit = defineEmits(['openModalTask', 'dataUpdated']);

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  }
});

const tasksCopy = ref([...props.tasks]);

// Atualiza tasksCopy quando as props mudarem
watch(() => props.tasks, (newTasks) => {
  tasksCopy.value = [...newTasks];
});

const saveCreate = async () => {
  const data = {
    title: 'New Task',
    status: props.title.toLowerCase()
  };

  const response = await axios.post(`http://localhost:3000/api/v1/tasks`, data);

  dataUpdatedTask();
  sendEmitModalTask(response.data.task);
  messageStore.setMessage(response.data.message);
};

const dataUpdatedTask = () => {
  emit('dataUpdated');
};

const sendEmitModalTask = (task) => {
  emit('openModalTask', { openModalTask: true, task });
};

const handleDragEnd = () => {
  drag.value = false;
  emit('dataUpdated', tasksCopy.value); // emite tasks atualizadas
};
</script>

<template>
  <div class="relative col-span-12 md:col-span-4 px-2 text-center bg-header pt-0 p-6 rounded-lg shadow-lg">
    <i class="icon-add-task bx bx-plus bx-sm cursor-pointer" @click.prevent="saveCreate()"></i>

    <h2 class="text-2xl font-medium mb-2 text-white py-2 lh-0">{{ title }}</h2>

    <div class="scrool-list px-2 h-100">
      <draggable 
        v-model="tasksCopy" 
        :group="title.toLowerCase()" 
        item-key="id" 
        @start="drag = true" 
        @end="handleDragEnd"
      >
        <template #item="{ element }">
          <div 
            class="mx-auto card-custom bg-gray-100 w-full border border-gray-400 rounded-md mt-3 cursor-pointer"
            @click.prevent="sendEmitModalTask(element)"
          >
            {{ element.title }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.card-custom {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem .5rem;
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
