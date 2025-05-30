<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const selectedEmoji = ref('')
const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const emojis = [
  "😀", "😅", "😂", "😎", "😍", "🥳",
  "😡", "😴", "🤖", "👻", "🙈", "💩",
  "😇", "😭", "🤩", "😤", "😱", "😜",
  "😈", "🥺", "🤯", "🥶", "🤢", "🤬",
  "🐶", "🐱", "🐸", "🐵", "🦄", "🐲",
  "🐼", "🦊", "🐔", "🐧", "🦖", "🕷️",
  "🎮", "🎨", "🎭", "🎉", "🍕", "🍔",
  "🚀", "🛸", "🪐", "🌈", "🌟", "🧠",
  "☕", "👨‍💻",,
  "🧙‍♂️✨", "🧛‍♀️🦇", "🤹‍♂️🎪", "🦸‍♀️💥", "👨‍💻☕", "🐉🔥"
];

const selectEmoji = (emoji) => {
  changeEmoji(emoji);
  showModal.value = false;
};

const changeEmoji = async (emoji) => {
    try {
        let updateData = {};
        updateData.user_emoji = emoji;
        await axios.put(`http://localhost:3000/api/v1/configurations`, updateData);

        getEmoji();
    } catch (error) {
        console.log(error);
    }
}

const getEmoji = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/configurations`);
        selectedEmoji.value = response.data.user_emoji;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
  getEmoji();
});
</script>

<template>
  <div class="relative inline-block">
    <button @click="toggleModal" class="hover:opacity-80 cursor-pointer">
      {{ selectedEmoji }}
    </button>

    <div
      v-if="showModal"
      class="absolute z-10 bg-white border rounded shadow p-2 flex min-w-[200px] flex-wrap"
    >
        <div class="relative w-full">
            <i @click="showModal = false" class="close-emoji-modal text-red-600 absolute mt-[-5%] ml-[97%] cursor-pointer ph ph-x"></i>
        </div>

        <span
            v-for="emoji in emojis"
            :key="emoji"
            class="cursor-pointer hover:scale-110 transition"
            @click="selectEmoji(emoji)"
            >
            {{ emoji }}
        </span>
    </div>
  </div>
</template>

<style scoped>
.close-emoji-modal {
    font-size: .85rem;
}
</style>
