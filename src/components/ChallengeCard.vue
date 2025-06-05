<script setup>
const props = defineProps({
  challenge: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['complete'])

const completeChallenge = () => {
  if (props.challenge.progress >= 100 && !props.challenge.completed) {
    emit('complete', props.challenge.id)
  }
}

const getBadgeSVG = (badge, color, stroke) => {
  switch(badge) {
    case 'carbon-reducer':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 8L8 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'eco-warrior':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 8V12L15 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16V16.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'plastic-free':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M8 12L16 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8L12 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'beginner-eco':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 8V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'energy-conscious':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 9V12L14.5 14.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    case 'hydrate-eco':
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
          <path d="M12 16V12L9 9" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8V8.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    default:
      return `
        <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#9E9E9E" stroke="#616161" stroke-width="2"/>
          <path d="M12 8V12V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
  }
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
    <div v-if="props.challenge.completed" class="bg-greenlight text-white text-xs font-bold px-3 py-1 text-center">
      SELESAI
    </div>
    <div v-else-if="props.challenge.progress > 0"
      class="bg-secondaryblue text-white text-xs font-bold px-3 py-1 text-center">
      DALAM PROGRES
    </div>
    <div v-else class="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 text-center">
      BELUM DIMULAI
    </div>

    <div class="p-5 flex-grow flex flex-col">
      <h3 class="font-semibold text-lg mb-2 text-gray-800">{{ props.challenge.title }}</h3>
      <p class="text-gray-600 text-sm mb-4 flex-grow">{{ props.challenge.description }}</p>

      <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ props.challenge.duration }}
        </span>
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {{ props.challenge.participants }} peserta
        </span>
      </div>

      <div class="mb-4">
        <div class="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progres</span>
          <span>{{ props.challenge.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="h-2.5 rounded-full" :class="{
            'bg-greenlight': props.challenge.completed,
            'bg-secondaryblue': !props.challenge.completed && props.challenge.progress > 0,
            'bg-gray-300': props.challenge.progress === 0
          }" :style="{ width: `${props.challenge.progress}%` }"></div>
        </div>
      </div>

      <button @click="completeChallenge" :class="[
        'w-full py-2 rounded-md font-medium transition-colors mt-auto',
        props.challenge.completed
          ? 'bg-greenlight/10 text-greenlight cursor-default'
          : props.challenge.progress === 100
            ? 'bg-greenlight text-white hover:bg-semigreen cursor-pointer'
            : 'bg-gray-100 text-gray-600 cursor-not-allowed'
      ]" :disabled="props.challenge.progress !== 100 || props.challenge.completed">
        {{
          props.challenge.completed ? 'Telah Selesai' :
            props.challenge.progress === 100 ? 'Klaim EcoBadge' :
              props.challenge.progress > 0 ? 'Lanjutkan' : 'Mulai Tantangan'
        }}
      </button>
    </div>

    <div v-if="props.challenge.completed" class="bg-greenlight/10 p-3 border-t border-greenlight/30 flex items-center">
      <div v-html="getBadgeSVG(props.challenge.badge, props.challenge.badgeColor, props.challenge.badgeStroke)"></div>
      <span class="text-sm text-greenlight">Earned: {{ props.challenge.badge.replace('-', ' ') }}</span>
    </div>
  </div>
</template>
