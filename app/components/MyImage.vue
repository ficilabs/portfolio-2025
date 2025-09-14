<script lang="ts" setup>
import { useHead } from '#imports'
import { computed, onMounted, ref } from 'vue'
import { responsiveImg } from '~/utils/responsive-image'

/** Props (breakpoints & sizeList are number[]) */
interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
  autoSize?: boolean
  isPhoto?: boolean
  isPhotoModal?: boolean
  borderRadius?: string
  imageClass?: string
  sizeList?: number[]
  breakpoints?: number[]
  preload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: 'https://a.storyblok.com/f/95455/2560x1600/8301f1b8cc/popmots-screenshot.png',
  alt: 'non of them',
  width: 0,
  height: 0,
  autoSize: true,
  isPhoto: false,
  isPhotoModal: false,
  borderRadius: '0',
  imageClass: '',
  sizeList: () => [480, 768, 1024, 1280],
  breakpoints: () => [480, 768, 1024],
  preload: true,
})

const el = ref<Element | null>(null)
const pictureRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)

defineExpose({ el })

// Preload head link (if preload)
useHead({
  link: props.preload
    ? [
        {
          rel: 'preload',
          as: 'image',
          href: responsiveImg.createSrc(props.src, '1280x0'),
          imagesrcset: responsiveImg.createSrcset(
            props.src,
            'filters:format(webp)',
            props.sizeList
          ).join(' '),
        },
      ]
    : [],
})

// Main src + srcsets
const src = computed(() => {
  if (props.isPhotoModal) return props.src
  return responsiveImg.createSrc(props.src, !props.isPhoto ? '1280x0' : '2048x0/smart')
})

const srcsetPng = computed(() =>
  props.isPhotoModal ? [`${props.src} ${props.width}w`] : responsiveImg.createSrcset(props.src, 'filters:format(png)', props.sizeList)
)

const srcsetWebp = computed(() =>
  props.isPhotoModal ? [`${props.src} ${props.width}w`] : responsiveImg.createSrcset(props.src, 'filters:format(webp)', props.sizeList)
)

// Build indexed source arrays so template can render first/middle/last cleanly
const webpSources = computed(() =>
  srcsetWebp.value.map((s, i) => ({ srcset: s, index: i }))
)
const pngSources = computed(() =>
  (srcsetPng.value ?? []).map((s, i) => ({ srcset: s, index: i }))
)

// Local convenience copy of breakpoints (always exists because of defaults)
const bps = props.breakpoints as number[]

// Lazy load via IntersectionObserver
onMounted(() => {
  if (pictureRef.value) {
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 })
    observer.observe(pictureRef.value)
  }
})

function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target as HTMLPictureElement)
      observer.unobserve(entry.target)
    }
  })
}

function loadImage(pictureElement: HTMLPictureElement) {
  const sources = Array.from(pictureElement.querySelectorAll('source')) as HTMLSourceElement[]
  for (const source of sources) {
    const ds = source.dataset.srcset
    if (ds) source.srcset = ds
  }
  const img = pictureElement.querySelector('img') as HTMLImageElement | null
  if (!img) return
  const ds = pictureElement.dataset.src
  if (ds) img.src = ds
  img.onload = () => {
    isLoading.value = false
  }
  img.classList.add('loaded')
}
</script>

<template>
  <div ref="el">
    <picture ref="pictureRef" class="picture" :data-src="src">
      <div v-if="isLoading" class="loading">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>

      <!-- Photo modal simplified sources -->
      <template v-if="isPhotoModal">
  <source v-if="webpSources[0]" :data-srcset="webpSources[0].srcset" type="image/webp" />
  <source v-if="pngSources?.[0]" :data-srcset="pngSources?.[0]?.srcset" type="image/png" />
      </template>

      <!-- Responsive sources (WEBP) -->
      <template v-else>
        <template v-if="bps && bps.length">
          <!-- First: max-width <= breakpoints[0] -->
          <source
            v-if="webpSources[0]"
            :data-srcset="webpSources[0].srcset"
            :media="`(max-width: ${bps[0]}px)`"
            type="image/webp"
          />

          <!-- Middle ranges: for index > 0 and index < webpSources.length - 1 -->
          <template v-for="(item, idx) in webpSources" :key="item.srcset + '-webp-' + idx">
            <source
              v-if="idx > 0 && idx < webpSources.length - 1"
              :data-srcset="item.srcset"
              :media="`(min-width: ${(bps?.[idx - 1] ?? 0) + 1}px) and (max-width: ${(bps?.[idx] ?? 9999)}px)`"
              type="image/webp"
            />
          </template>

          <!-- Last: min-width >= last breakpoint + 1 -->
          <source
            v-if="webpSources[webpSources.length - 1] && bps && bps.length"
            :data-srcset="webpSources[webpSources.length - 1]?.srcset"
            :media="`(min-width: ${(bps?.[bps.length - 1] ?? 0) + 1}px)`"
            type="image/webp"
          />

          <!-- Repeat same logic for PNG -->
          <source
            v-if="pngSources[0]"
            :data-srcset="pngSources[0].srcset"
            :media="`(max-width: ${bps[0]}px)`"
            type="image/png"
          />

          <template v-for="(item, idx) in pngSources" :key="item.srcset + '-png-' + idx">
            <source
              v-if="idx > 0 && idx < pngSources.length - 1"
              :data-srcset="item.srcset"
              :media="`(min-width: ${(bps?.[idx - 1] ?? 0) + 1}px) and (max-width: ${(bps?.[idx] ?? 9999)}px)`"
              type="image/png"
            />
          </template>

          <source
            v-if="pngSources[pngSources.length - 1] && bps && bps.length"
            :data-srcset="pngSources[pngSources.length - 1]?.srcset"
            :media="`(min-width: ${(bps?.[bps.length - 1] ?? 0) + 1}px)`"
            type="image/png"
          />
        </template>
      </template>

      <img
        :class="[
          'image',
          { 'image--auto-size': autoSize },
          { 'image--photo': isPhoto },
          { 'image--photo-modal': isPhotoModal },
        ]"
        :alt="alt || ''"
        :width="width !== undefined ? width : undefined"
        :height="height !== undefined ? height : undefined"
        :data-src="src"
        src="~/assets/placeholder.svg"
        :style="{ borderRadius }"
      />
    </picture>

    <svg style="width:0;height:0">
      <filter id="darken">
        <feColorMatrix
          type="matrix"
          values="0.75 0 0 0 0  0 0.75 0 0 0  0 0 0.75 0 0  0 0 0 1 0"
        />
      </filter>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';

.image {
  opacity: 0;
  transition: opacity 0.2s 0.15s ease-out;

  &--auto-size {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left;
  }

  &--photo {
    display: block;
    max-width: 100%;
    object-position: center;
    aspect-ratio: 1 / 1;
  }

  &--photo-modal {
    display: block;
    object-position: center;
    object-fit: contain;
  }
}

.picture {
  position: relative;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;

  .circle {
    width: 8px;
    height: 8px;
    margin: 2px;
    border-radius: 50%;
    background-color: var(--tertiary);
    animation: bounce 0.5s infinite alternate cubic-bezier(0.77, 0, 0.18, 1);
  }

  .circle:nth-child(2) {
    animation-delay: 0.15s;
  }

  .circle:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }
}

.loaded {
  opacity: 1;
}

.dark-scheme {
  .image:not(.image.image--photo-modal) {
    filter: url(#darken);
  }
}
</style>
