import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMessageStore = defineStore('messageStore', () => {
    let alertMessage = reactive({ msg: '', color: '' })
    let refresh = ref(false)
    let timeoutId = null // Store timeout ID to clear it later

    // Reset the message and stop animation
    const resetMessage = () => {
        alertMessage.msg = ''
        alertMessage.color = ''
        refresh.value = false // Reset animation by turning off refresh
    }

    // Set a new message and restart the animation
    const setMessage = (message, color = 'green') => {
        if (timeoutId) {
            clearTimeout(timeoutId) // Clear existing timeout before starting a new one
        }

        refresh.value = true // Start refresh to restart animation

        // Reset message and stop the animation
        alertMessage.msg = ''
        alertMessage.color = ''

        // Set the new message after a small delay to trigger animation
        setTimeout(() => {
            alertMessage.msg = message
            alertMessage.color = color
            refresh.value = false // Stop refresh after setting the message

            // Automatically reset the message after 5 seconds
            timeoutId = setTimeout(() => {
                resetMessage()
            }, 5000)
        }, 10) // Small delay to ensure animation restarts
    }

    return { alertMessage, refresh, resetMessage, setMessage }
})
