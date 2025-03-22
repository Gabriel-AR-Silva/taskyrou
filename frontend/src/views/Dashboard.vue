<script setup>
import axios from 'axios'

 const getAllTasks = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/tasks/by-list');
    console.log(response.data);
 }

 getAllTasks()
</script>

<template>
    <div id="dashboard" class="container mx-auto mt-5">
        <h1 class="text-5xl text-center">Dashboard</h1>

        <div class="grid grid-flow-col grid-rows-1 bg-yellow-300 mt-5">
            <div>Pending</div>
            <div>Doing</div>
            <div>Done</div>
        </div>
    </div>
</template>