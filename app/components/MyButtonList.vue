<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

defineExpose({ el })

const props = defineProps<{
  buttons: {
    id: string | number
    text: string
    isRound?: boolean
    isLink?: boolean
    link?: string
    isSelected?: boolean
  }[]
}>()
</script>

<template>
  <ul class="button-list" ref="el">
    <li
      v-for="button in buttons"
      :key="button.id"
      class="button-list__elem"
    >
      <MyButton
        :text="button.text"
        :isRound="button.isRound"
        :isLink="button.isLink"
        :link="button.link"
        :isSelected="button.isSelected"
        @buttonClicked="$emit('buttonClicked', $event)"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.button-list {
  display: none;
  margin-top: var(--space-s-m);

  @media screen and (min-width: $max-width) {
    display: flex;
  }
}
</style>