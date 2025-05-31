<script setup>
import { ref, watch, computed } from 'vue'
import axios from 'axios'
import { useMessageStore } from '@/stores/messageStore'

const props = defineProps({
  attribute: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['attributeUpdated'])
const messageStore = useMessageStore()

const inProcess = ref(false)

const form = ref({
  _id: '',
  title: '',
  description: ''
})

const isEditMode = computed(() => props.attribute && props.attribute._id)

watch(
  () => props.attribute,
  (newAttr) => {
    if (newAttr) {
      form.value = { ...newAttr }
    } else {
      form.value = { _id: null, title: '', description: '' }
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  try {
    inProcess.value = true
    const url = isEditMode.value
      ? `http://localhost:3000/api/v1/attributes/${form.value._id}`
      : `http://localhost:3000/api/v1/attributes`

    const method = isEditMode.value ? 'put' : 'post'

    const response = await axios[method](url, form.value)
    messageStore.setMessage(response.data.message)
    emit('attributeUpdated')
  } catch (error) {
    console.error(error)
    messageStore.setMessage(error.message)
  } finally {
    inProcess.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md mx-auto p-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input type="text" v-model="form.title" id="title" name="title"
        class="mt-1 block w-full px-2 py-1 border rounded text-sm" />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" v-model="form.description" name="description" rows="2"
        class="mt-1 block w-full px-2 py-1 border rounded text-sm"></textarea>
    </div>

    <button type="submit" :disabled="inProcess"
      class="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600 cursor-pointer">
      {{ isEditMode ? 'Update' : 'Create' }}
    </button>
  </form>
</template>
