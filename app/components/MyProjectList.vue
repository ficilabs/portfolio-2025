<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

// ✅ Define props directly (no Storyblok, no import type)
const props = defineProps<{
  filters: { tag: string; label: string }[]
  projects: {
    id: string
    title: string
    description: string
    tags?: string[]
    media?: { id: string; url: string; alt?: string }
    demo?: string
    code?: string
  }[]
}>()

const projectListRef = ref<Element>()
const selectedFilter = ref<string>('show-all')

onMounted(() => {
  animateFading(window.innerWidth < 1024 ? 1 : 2)
})

const filteredProjects = computed(() => {
  return props.projects.filter((project) => {
    return selectedFilter.value === 'show-all'
      ? true
      : project.tags?.includes(selectedFilter.value)
  })
})

function animateFading(delay: number) {
  if (projectListRef.value) {
    gsap.set(projectListRef.value, { autoAlpha: 0 })
    gsap.to(projectListRef.value, { autoAlpha: 1, duration: 1, delay })
  }
}

function setOverflow(value: string) {
  document.documentElement.style.overflow = value
}

function refreshScroll() {
  setOverflow('auto')
}

function changeFilter(tag: string) {
  selectedFilter.value = tag
}
</script>

<template>
  <section class="projects page__component">
    <MyProjectFilter
      :buttonList="filters.map(f => ({ id: f.tag, text: f.label, tag: f.tag, isRound: true }))"
      :filterSelected="selectedFilter"
      @filterSelected="changeFilter"
    />

    <div ref="projectListRef" class="projects__list-wrapper">
      <TransitionGroup
        tag="ul"
        name="list-complete"
        class="projects__list"
        @before-enter="setOverflow('hidden')"
        @before-leave="setOverflow('hidden')"
        @after-enter="refreshScroll"
        @after-leave="refreshScroll"
      >
        <li
          v-for="project in filteredProjects"
          :key="project.id"
          class="projects__project list-complete-item"
        >
          <MyProject :project="{
            ...project,
            demo: project.demo ? { url: project.demo } : undefined,
            code: project.code ? { url: project.code } : undefined,
            media: project.media ? {
              id: project.media.id,
              filename: project.media.url,
              alt: project.media.alt || ''
            } : {
              id: '',
              filename: '',
              alt: ''
            }
          }" />
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.projects {
  width: 100%;
  height: auto;
  padding: 0 25px var(--nav-height);

  &__list-wrapper {
    visibility: hidden;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit,
        minmax(max(250px, calc((100% - 50px) / 2)), 1fr));
    justify-content: center;
    gap: 50px;
    margin-top: 50px;

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      justify-content: flex-start;
      gap: 100px;
      margin-top: 100px;
    }
  }
}

.list-complete {
  will-change: transform;

  &-item {
    transition-property: opacity, transform;
    transition-duration: 0.75s;
    transition-timing-function: ease-in-out;
  }

  &-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);

    &-item {
      transition-delay: 0.5s;
    }
  }

  &-leave-active {
    position: absolute;
    visibility: hidden;
  }
}
</style>
