<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useMessageStore } from '@/stores/messageStore'
const messageStore = useMessageStore();

let inProccess = ref(false);

const emit = defineEmits(['attributeUpdated']);

let form = ref({
    'title': '',
    'description': '',
});

const formSubmit = async () => {
    try {
        inProccess.value = true;
        const updateData = {...form.value};
        const response = await axios.put(`http://localhost:3000/api/v1/attributes`, updateData);
        messageStore.setMessage(response.data.message);
        getAttibuteData();
        emit('attributeUpdated');
    } catch (error) {
        console.log(error);
        messageStore.setMessage(error.message)
    } finally {
        inProccess.value = false;
    }
}

const getAttibuteData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/attributes`);

        form.value.title = response.data.title ?? '';
        form.value.description = response.data.description ?? '';

    } catch (error) {
        console.log(error);
        messageStore.setMessage(error.message)
    }
}

onMounted(() => {
    getAttibuteData()
})
</script>

<template>
    <form @submit.prevent="formSubmit" class="space-y-4 max-w-md mx-auto p-4">
        <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" v-model="form.title" id="title" name="title" class="mt-1 block w-full px-2 py-1 border rounded text-sm" />
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" v-model="form.description" name="description" rows="2" class="mt-1 block w-full px-2 py-1 border rounded text-sm"></textarea>
        </div>

        <button type="submit" :disabled="inProccess" class="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600 cursor-pointer">
            Submit
        </button>
    </form>
</template>