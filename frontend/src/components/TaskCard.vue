<template>
<div class="bg-white rounded-lg shadow flex flex-col gap-3 border-l-4 border-red-500 p-4">
    <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500"></span>
        <span class="text-sm font-semibold text-red-600">Hard</span>
    </div>

    <h3 class="text-base font-bold text-gray-800">Enviar relatório semanal</h3>

    <div class="flex justify-between text-sm">
        <span class="text-red-600 font-medium">Late</span>
        <label class="inline-flex items-center gap-1 text-gray-700">
        <input type="checkbox" class="form-checkbox text-green-600 rounded" />
            Done
        </label>
    </div>

    <div class="flex flex-wrap gap-1 text-xs mt-2">
        <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">🧠 Memory</span>
        <span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">🛡️ Resistence</span>
    </div>

    <div class="flex justify-between text-xs text-gray-500">
        <span>03/06/2025 - 18:00</span>

        <div class="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2" ry="2" stroke-linejoin="round" />
                <line x1="7" y1="8" x2="17" y2="8" stroke-linecap="round" />
                <line x1="7" y1="12" x2="17" y2="12" stroke-linecap="round" />
                <line x1="7" y1="16" x2="14" y2="16" stroke-linecap="round" />
            </svg>
            <span class="text-gray-700 font-bold">15Pts</span>
        </div>
    </div>
</div>
</template>