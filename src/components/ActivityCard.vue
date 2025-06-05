<template>
  <div class="activity-card">
    <div class="flex items-center mb-3">
      <span class="text-2xl mr-2">{{ icon }}</span>
      <h3 class="font-semibold text-darkblue text-lg">{{ title }}</h3>
    </div>

    <div class="space-y-2">
      <div v-for="item in items" :key="item.type" class="activity-item">
        <div class="flex items-center mb-1">
          <span class="text-xl mr-2">{{ item.icon }}</span>
          <span class="text-gray-700">{{ item.label }}</span>
        </div>

        <div v-if="showQuantity">
          <input v-model="modelValue[item.type]" type="number" min="0"
            class="input-field max-w-3/4 p-2 outline-none focus:border focus:border-gray-500 rounded-xl"
            :placeholder="unit" @input="$emit('update', category, item.type, $event.target.valueAsNumber)">
        </div>
        <div v-else>
          <label class="inline-flex items-center">
            <input v-model="modelValue[item.type]" type="checkbox" class="rounded text-green-500"
              @change="$emit('update', category, item.type, $event.target.checked)">
            <span class="ml-2 text-sm">{{ item.question }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  icon: String,
  items: Array,
  modelValue: Object,
  unit: String,
  showQuantity: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update'])
</script>
