<script setup>
import axios from "axios";
import { onMounted, ref, toRaw } from "vue";
import { useMessageStore } from '@/stores/messageStore'
const messageStore = useMessageStore();

const emit = defineEmits(['configUpdated']);

const props = defineProps({
    showRefreshFields: {
        type: Boolean,
        default: false
    }
})

let form = ref({
    'user_name': '',
    'user_image': '',
    'user_phrases': '',
});

const formSubmit = async () => {
    try {
        const updateData = {...form.value};
        const response = await axios.put(`http://localhost:3000/api/v1/configurations`, updateData);
        messageStore.setMessage(response.data.message);
        getConfigurationData();
        emit('configUpdated');
    } catch (error) {
        console.log(error);
        messageStore.setMessage(error.message)
    }
}

const getConfigurationData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/configurations`);

        form.value.user_name = response.data.user_name ?? '';
        form.value.user_image = response.data.user_image ?? '';
        form.value.user_phrases = response.data.user_phrases ?? '';

    } catch (error) {
        console.log(error);
        messageStore.setMessage(error.message)
    }
}

onMounted(() => {
    getConfigurationData()
})
</script>

<template>
    <form @submit.prevent="formSubmit" class="space-y-4 max-w-md mx-auto p-4">
        <div v-if="props.showRefreshFields" class="grid grid-cols-12 gap-3">
            <div class="col-span-6">
                <label for="refresh_week_day" class="block text-sm font-medium text-gray-700">Refresh Week Day</label>
                <select name="refresh_week_day" id="refresh_week_day" class="mt-1 block w-full px-2 py-1 border rounded text-sm">
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                </select>
            </div>
            
            <div class="col-span-6">
                <label for="refresh_week_hour" class="block text-sm font-medium text-gray-700">Refresh Week Hour</label>
                <input type="time" id="refresh_week_hour" name="refresh_week_hour" class="mt-1 block w-full px-2 py-1 border rounded text-sm" />
            </div>
        </div>

        <div>
            <label for="user_name" class="block text-sm font-medium text-gray-700">User Name</label>
            <input type="text" v-model="form.user_name" id="user_name" name="user_name" class="mt-1 block w-full px-2 py-1 border rounded text-sm" />
        </div>

        <div>
            <label for="user_image" class="block text-sm font-medium text-gray-700">User Image (URL)</label>
            <input type="url" v-model="form.user_image" id="user_image" name="user_image" class="mt-1 block w-full px-2 py-1 border rounded text-sm" />
        </div>

        <div>
            <label for="user_phrases" class="block text-sm font-medium text-gray-700">User Phrase</label>
            <textarea id="user_phrases" v-model="form.user_phrases" name="user_phrases" rows="2" class="mt-1 block w-full px-2 py-1 border rounded text-sm"></textarea>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600 cursor-pointer">
            Submit
        </button>
    </form>
</template>