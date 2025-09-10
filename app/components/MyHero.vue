<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { elasticAnimation } from '~/utils/gsap-animations'

// Props for flexible Hero usage
const props = defineProps<{
  title: string
  subtitle?: string
  description?: string
  buttons?: {
    id: string | number
    text: string
    isRound?: boolean
    isLink?: boolean
    link?: string
    isSelected?: boolean
  }[]
  images?: string[]
}>()

// Refs
const heroRef = ref<Element | null>(null)
const heroGroupRef = ref<Element | null>(null)
const buttonsRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const heroFigureRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (
    heroRef.value &&
    heroGroupRef.value &&
    buttonsRef.value &&
    textRef.value &&
    heroFigureRef.value
  ) {
    animateHero(
      heroRef.value,
      heroGroupRef.value,
      buttonsRef.value,
      textRef.value,
      heroFigureRef.value
    )
  }
})

function animateHero(
  hero: Element,
  heroGroup: Element,
  heroButtons: Element,
  heroText: Element,
  heroFigure: Element
): void {
  const tl = gsap.timeline({
    delay: 0.25,
    defaults: { ease: 'ease.in', duration: 0.5 },
  })

  tl.set(heroButtons.querySelectorAll('.button'), { x: 0, y: 0 })
  tl.set(heroText.querySelector('h2'), { opacity: 0, yPercent: 50 })
  tl.set(heroText.querySelector('p'), { opacity: 0, yPercent: 20 })

  tl.from(hero, { autoAlpha: 0 })
  tl.from(heroGroup, { autoAlpha: 0 }, '0')

  tl.to(heroText.querySelector('h2'), { opacity: 1, yPercent: 0 })
  tl.to(heroText.querySelector('p'), { opacity: 1, yPercent: 0 })

  if (window.innerWidth > 1024) {
    tl.from(heroButtons, { autoAlpha: 0 })
    tl.add(
      elasticAnimation(
        heroButtons.querySelectorAll('.button'),
        -10,
        -10,
        0.75,
        0,
        0.25
      ),
      '>-=0.25'
    )
  }

  tl.from(heroFigure, { autoAlpha: 0, duration: 1 }, '<')
  tl.from(
    heroFigure.querySelectorAll('img'),
    {
      opacity: 0,
      clearProps: 'all',
      duration: 0.75,
      stagger: { amount: 0.25 },
    },
    '>-=0.5'
  )
}
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
  >
    <div
      ref="heroGroupRef"
      class="hero__group"
    >
      <p ref="textRef" class="hero__text" v-if="description">{{ description }}</p>
      
      <MyButtonList
        ref="buttonsRef"
        v-if="buttons" 
        :buttons="buttons"
      />
    </div>
    <MyHeroFigure />
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: var(--primary);

  @media screen and (min-width: $max-width) {
    margin-top: -50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__group {
    position: relative;
    padding: 0 25px;

    @media screen and (min-width: $max-width) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__text {
    position: relative;
    z-index: 1;
  }

}
</style>
