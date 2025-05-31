<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useMessageStore } from '@/stores/messageStore'

import Modal from '@/components/Modal.vue';
import FormAttribute from "./FormAttribute.vue";

const messageStore = useMessageStore();

let attributesList = ref([]);
let selectedAttr = ref(null)

const getAttibutes = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/attributes`);
        attributesList.value = response.data;

    } catch (error) {
        console.log(error);
        messageStore.setMessage(error.message)
    }
}

const expandAttrEditModal = ref(null);
const openModalFormAttribute = (attr) => {
    selectedAttr.value = { ...attr };
    expandAttrEditModal.value?.openModal()
}

onMounted(() => {
    getAttibutes()
})
</script>

<template>
<div>
    <Modal :headerTitle="`Edit Attribute: ${selectedAttr?.title}`" ref="expandAttrEditModal">
        <FormAttribute :attribute="selectedAttr" @attributeUpdated="getAttibutes"/>
    </Modal>
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 bg-dark">
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-800 text-gray-200">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-800 text-gray-200">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-800 text-gray-200">
                        Level
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-800 text-gray-200">
                        Progress
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-800 text-gray-200">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="attr in attributesList" :key="attr._id" class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {{ attr.title }}
                    </th>
                    <td class="px-6 py-4">
                        {{ attr.description }}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-blue-900 font-bold">
                        {{ attr.level }}
                    </td>
                    <td class="px-6 py-4">
                        <div class="relative w-full h-4 bg-gray-200 rounded overflow-hidden border">
                            <div
                                class="absolute top-0 left-0 h-full bg-green-500"
                                :style="{ width: (attr.progress_xp / attr.progress_max * 100) + '%' }"
                            >
                            </div>
                            <span
                            class="absolute w-full text-center text-[10px] font-semibold text-black"
                            >
                            {{ attr.progress_xp }} / {{ attr.progress_max }}
                            </span>
                        </div>
                    </td>
                    <td class="pl-6 py-4 flex gap-3">
                        <i class="ph ph-pencil-simple-line text-amber-600 hover:text-gray-200 hover:bg-amber-600 p-2 border rounded cursor-pointer" @click="openModalFormAttribute(attr)"></i>
                        <i class="ph ph-trash text-red-600 hover:text-gray-200 hover:bg-red-600 p-2 border rounded cursor-pointer"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<style scoped>
.progressGroup {
    position: relative;
}

.progressGroup span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>