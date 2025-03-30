<script setup>
import { useMessageStore } from '@/stores/messageStore'

const messageStore = useMessageStore();
</script>

<template>
    <div>
        <div 
            class="message-card bg-white p-5 rounded-sm border-gray-400 border-1 shadow-2xl transition ease-in duration-100 min-w-[70%] md:min-w-[400px]"
            :class="messageStore.alertMessage.msg ? 'animation opacity-100 scale-100' : 'opacity-0 hidden'"
            :style="{ '--barr-color': messageStore.alertMessage.color }"
            v-if="messageStore.alertMessage.msg"
        >
            <div class="relative">
                <i class='close bx bx-x bx-sm cursor-pointer' @click="messageStore.resetMessage"></i>
                {{ messageStore.alertMessage.msg }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.message-card {
    position: absolute;
    bottom: 2%;
    right: 1%;
}

/* Animation for the progress bar */
.message-card.animation::after {
    content: '';
    position: absolute;
    background-color: var(--barr-color);
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    animation: barrMessage 5s linear forwards;
}

@keyframes barrMessage {
    100% {
        width: 0%;
    }
}

.close {
    position: absolute;
    top: -80%;
    right: -5%;
}
</style>
