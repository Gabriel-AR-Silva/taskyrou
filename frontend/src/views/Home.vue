<template>
    <div id="home" class="h-full flex items-center justify-center text-center px-6">
        <div class="max-w-2xl">
            <section id="hero">
                <h1 class="text-white text-5xl font-bold">
                    Organize your task routine with 
                    <span class="decoration-name-proj">Taskyrou</span>
                </h1>

                <p class="text-white mt-5">
                    This project was created with a focus on learning, using VueJS, Tailwind, NodeJs and MongoDB. This is to organize and facilitate your task routine. I used Trello as a base.
                </p>

                <router-link :to="{ name: 'dashboard' }" class="mt-10 inline-block">
                    <button class="inline-flex items-center justify-center text-xl font-semibold px-5 py-2 rounded-lg tracking-wide text-white bg-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer">
                        Start to organize
                    </button>
                </router-link>
            </section>
        </div>
    </div>
</template>

<style scoped>
#home {
    background-color: #0F1625;
}

.decoration-name-proj {
    text-decoration: underline;
    text-decoration-color: oklch(0.623 0.214 259.815);
}
</style>
