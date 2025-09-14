<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { h } from 'vue';

// Import components
import MyPage from '~/components/MyPage.vue';
import MyHero from '~/components/MyHero.vue';
import MyParagraph from '~/components/MyParagraph.vue';
import MyProjectList from '~/components/MyProjectList.vue';

const route = useRoute();
const slug = route.params.slug as string;

// Map slug -> { title, content }
const componentsMap: Record<string, { title: string; content: any }> = {
  about: {
    title: "About Me",
    content: h(MyParagraph, {
      text: "This is an animated paragraph that fades in on mana anmanna.",
      link: "https://example.com",
      linkText: "Read more",
      figure: {
        component: "img",
        src: "https://a.storyblok.com/f/95455/2048x2048/ea5a3950fc/happy_birthday_claudia_.png",
        alt: "Sample",
      },
      isReversed: true,
      showScroll: true,
    }),
  },
  projects: {
    title: "Projects",
    content: h(MyProjectList, {
      filters: [
        { tag: "show-all", label: "All" },
        { tag: "web", label: "Web" },
        { tag: "mobile", label: "Mobile" },
        { tag: "design", label: "Design" },
      ],
      projects: [
        {
          id: "1",
          title: "Nuxt Portfolio",
          description: "A modern portfolio built with Nuxt 3 and GSAP.",
          tags: ["web"],
          media: {
            id: "img1",
            url: "https://a.storyblok.com/f/95455/2560x1600/8301f1b8cc/popmots-screenshot.png",
            alt: "Nuxt Portfolio Screenshot",
          },
          demo: "https://portfolio.example.com",
          code: "https://github.com/example/nuxt-portfolio",
        },
        {
          id: "2",
          title: "Mobile App",
          description: "A cross-platform mobile app example.",
          tags: ["mobile"],
          media: {
            id: "img2",
            url: "https://a.storyblok.com/f/95455/2560x1600/8301f1b8cc/popmots-screenshot.png",
            alt: "Mobile App Screenshot",
          },
          demo: "https://mobile.example.com",
          code: "https://github.com/example/mobile-app",
        },
        {
          id: "3",
          title: "Design System",
          description: "Reusable design system for web and mobile.",
          tags: ["design", "web"],
          media: {
            id: "img3",
            url: "https://a.storyblok.com/f/95455/2560x1600/8301f1b8cc/popmots-screenshot.png",
            alt: "Design System Screenshot",
          },
          demo: "https://design.example.com",
          code: "https://github.com/example/design-system",
        },
      ],
    }),
  },
};

const pageData = componentsMap[slug] || null;
</script>

<template>
  <div>
    <MyPage v-if="pageData" :title="pageData.title">
      <component :is="pageData.content" />
    </MyPage>

    <p v-else>Page not found</p>
  </div>
</template>
