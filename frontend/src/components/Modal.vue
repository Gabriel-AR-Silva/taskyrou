<script setup>
import { ref } from 'vue'

const showModal = ref(false)

const props = defineProps({
    headerTitle: {
        type: String,
        default: ''
    }
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

defineExpose({
  openModal,
  closeModal
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="showModal"
      style="background-color: rgba(0, 0, 0, 0.4);"
      class="fixed inset-0 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="modal bg-white rounded shadow min-w-[90%] md:min-w-[70%] lg:min-w-[50%] flex flex-col overflow-hidden">
        <div class="modal-header py-2 p-4 flex items-center justify-between" style="border-bottom: 1px solid gray;">
          <h2 class="text-xl">{{ headerTitle }}</h2>
          <i class="ph ph-x cursor-pointer scale-130 transition-transform hover:scale-110" @click="closeModal"></i>
        </div>
        
        <div class="modal-content py-2 flex-1 overflow-auto w-full">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
