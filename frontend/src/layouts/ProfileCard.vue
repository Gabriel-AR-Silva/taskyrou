<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import EmojiPicker from '@/components/EmojiPicker.vue'
import Modal from '@/components/Modal.vue';
import FormConfiguration from '@/components/Configuration/FormConfiguration.vue';

let configurationData = ref({});

let attributes = ref([]);

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

// const setXpPoints = async (attributeId) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:3000/api/v1/attributes/add-xp/${attributeId}`,
//       {
//         xp: 500,
//       }
//     );
//     getAllAttributes();
//   } catch (error) {
//     console.error('Erro ao atualizar XP:', error.response?.data || error.message);
//   }
// }

const expandUserEditModal = ref(null);
const openModalFormUserConfig = () => {
  expandUserEditModal.value?.openModal()
}

const refreshDashboardData = async () => {
  await Promise.all([
    getAllAttributes(),
    getConfigurationData()
  ]);
};

defineExpose({
  refreshDashboardData
});

onMounted(() => {
  refreshDashboardData();
});
</script>

<template>
<div>
    <Modal headerTitle="Edit Profile" ref="expandUserEditModal">
        <FormConfiguration @configUpdated="refreshDashboardData"/>
    </Modal>

    <div class="w-full relative bg-white border-grey p-4 rounded-sm mt-5">
        <div class="user_edit" @click="openModalFormUserConfig"><i class="ph ph-pencil"></i></div>

        <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-4">
                <div class="flex gap-3">
                    <div class="relative img-profile rounded-sm min-w-[70px] text-break" :style="`background-image: url(${configurationData.user_image})`">

                        <div class="user_emoji">
                            <EmojiPicker />
                        </div>
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

        <div class="relative phrases-box w-full bg-white border-grey py-1 p-4 rounded-sm mt-3 flex justify-center">
            <span class="text-sm text-gray-500">"{{ configurationData.user_phrases }}"</span> 
        </div>
    </div>
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