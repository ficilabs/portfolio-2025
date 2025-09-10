<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

// Props (replace with your own if needed)
defineProps<{
  title?: string
}>()

// Refs
const pageRef = ref<Element>()
const pageTitleRef = ref<Element>()
const pageGroupRef = ref<Element>()

onMounted(() => {
  if (pageRef.value && pageGroupRef.value) {
    animatePage(pageRef.value, pageGroupRef.value, pageTitleRef.value)
  }
})

function animatePage(page: Element, pageGroup: Element, pageTitle?: Element) {
  const tl = gsap.timeline({
    defaults: { ease: 'ease.in', duration: 0.5 },
  })

  if (window.innerWidth > 1024) {
    if (pageTitle) {
      tl.set(pageTitle, {
        autoAlpha: 0,
        yPercent: 50,
      })
    }
    tl.from(page, { autoAlpha: 0 })
    if (pageTitle) {
      tl.to(pageTitle, { autoAlpha: 1, yPercent: 0 })
    }
    if (pageGroup) {
      tl.from(pageGroup, { autoAlpha: 0 })
    }
  } else {
    tl.from(page, { autoAlpha: 0 })
    tl.from(pageGroup, { autoAlpha: 0 })
  }
}
</script>

<template>
  <section ref="pageRef" class="page">
    <h1
      v-if="title"
      ref="pageTitleRef"
      class="page__title"
    >
      <span v-html="title" />
      <span class="dot">.</span>
    </h1>

    <div ref="pageGroupRef" class="page__group">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;
@use "sass:math";

.page {
  position: relative;
  padding-bottom: var(--nav-height);
  height: 100%;
  color: var(--primary);
  visibility: hidden;

  @media screen and (min-width: $max-width) {
    padding-top: 50px;
  }

  &__title {
    position: relative;
    padding: 0 25px;
    font-size: var(--font-6xl);
    font-weight: 700;
    font-family: var(--font-family-secondary);
    text-transform: capitalize;
    z-index: 2;
    visibility: hidden;
    // Optionally, add responsive adjustments here if needed
  }

  &__group {
    height: 100%;
    margin-top: var(--space-l);
    visibility: hidden;
  }

  &__component {
    margin-top: 25px;
  }

}
</style>
