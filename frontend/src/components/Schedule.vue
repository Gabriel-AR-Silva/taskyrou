<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
 
// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues
// For updating events, use the events service plugin
const calendarApp = createCalendar({
  selectedDate: '2023-12-19',
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  locale: 'en-US',
  timeZone: 'UTC',
  firstDayOfWeek: 0,
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-19',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00',
    },
  ],
})
</script>
 
<template>
  <div class="calendar-scroll-container">
    <ScheduleXCalendar :calendar-app="calendarApp" class="text-sm leading-tight" />
  </div>
</template>

<style scoped>
.calendar-scroll-container {
  max-height: 500px; /* ou o valor que quiser */
  overflow-y: auto;
}
</style>