<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyButton from './MyButton.vue'
import { elasticAnimation } from '~/utils/gsap-animations'

/**
 * Types
 */
export type FilterButton = {
  id: string | number
  text: string
  tag: string
  isRound?: boolean
}

type Props = {
  buttonList: FilterButton[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  filterSelected: [tag: FilterButton['tag']]
}>()

/**
 * State
 */
const filterSelected = ref<FilterButton['tag']>('show-all')
const sliderScrollRef = ref<Element>()
const isPrevVisible = ref(false)
const isNextVisible = ref(false)
const offset = ref(5)

/**
 * Lifecycle
 */
onMounted(() => {
  setShadowVisibility({
    target: sliderScrollRef.value,
  } as unknown as Event)
  sliderScrollRef.value?.addEventListener('scroll', setShadowVisibility)
  animateButtons()
})

/**
 * Animations
 */
function animateButtons() {
  if (sliderScrollRef.value) {
    const projectFilterButtons = sliderScrollRef.value.querySelectorAll(
      '[data-animation="true"]'
    )
    if (window.innerWidth < 1024) {
      elasticAnimation(projectFilterButtons, -7, -7, 1, 0.25, 0)
    } else {
      elasticAnimation(projectFilterButtons, -7, -7, 1, 0.45, 0)
    }
  }
}

/**
 * Shadows
 */
function setShadowVisibility(e: Event): void {
  const el = e.target as Element
  if (el.scrollWidth - el.clientWidth <= 1) {
    isPrevVisible.value = false
    isNextVisible.value = false
  } else if (el.scrollLeft < offset.value) {
    isPrevVisible.value = false
    isNextVisible.value = true
  } else if (el.scrollWidth < el.scrollLeft + el.clientWidth + offset.value) {
    isPrevVisible.value = true
    isNextVisible.value = false
  } else {
    isPrevVisible.value = true
    isNextVisible.value = true
  }
}

/**
 * Events
 */
function onFilterSelected(tag: FilterButton['tag']): void {
  filterSelected.value = tag
  emit('filterSelected', tag)
}
</script>

<template>
  <div class="filter">
    <div class="filter__container">
      <!-- Prev shadow -->
      <div
        v-show="isPrevVisible"
        class="filter__scroll-shadow filter__scroll-shadow--prev"
        data-test="prev"
      ></div>

      <!-- Scrollable list -->
      <ul ref="sliderScrollRef" class="filter__list">
        <li
          v-for="button in buttonList"
          :key="button.id"
          class="filter__elem"
        >
          <MyButton
            :text="button.tag"
            :blok="button"
            :is-selected="button.tag === filterSelected"
            @buttonClicked="onFilterSelected(button.tag)"
            isRound
          />
        </li>
      </ul>

      <!-- Next shadow -->
      <div
        v-show="isNextVisible"
        class="filter__scroll-shadow filter__scroll-shadow--next"
        data-test="next"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.filter {
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;

    @media screen and (min-width: $max-width) {
      padding: 0;
    }
  }

  &__list {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 10px 10px 5px;
    overflow: auto;
    background-color: var(--tertiary);
  }

  &__scroll-shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    pointer-events: none;
    border-radius: var(--border-radius);

    &:hover {
      cursor: pointer;
    }

    &--next {
      background: linear-gradient(90deg,
          rgba($color: $stroke, $alpha: 0) 90%,
          rgba($color: $stroke, $alpha: 0.45) 100%);
      right: 0;
    }

    &--prev {
      left: 0;
      background: linear-gradient(-90deg,
          rgba($color: $stroke, $alpha: 0) 90%,
          rgba($color: $stroke, $alpha: 0.45) 100%);
    }
  }

  &__svg {
    color: var(--primary);
  }
}
</style>
