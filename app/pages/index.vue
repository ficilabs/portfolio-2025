<script setup lang="ts">
import MyPage from '~/components/MyPage.vue'
import MyHero from '~/components/MyHero.vue'

useSeoMeta({
  title: 'My Portfolio',
  ogTitle: 'My Portfolio',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'maskable-icon-512x512.png',
  twitterCard: 'summary_large_image',
})

const pageData = {
  title: "Hi! <br> I'm Rofiqi",
  content: {
    component: MyHero,
    props: {
      title: "Frontend Developer",
      description: "I’m passionate about building <strong>smart</strong> and <strong>impactful systems</strong> powered by <strong>web development</strong>, <strong>artificial intelligence</strong> and <strong>IoT</strong>.",
      buttons: [
        { id: 1, text: "Discover my projects", isLink: true, link: "/projects" },
        { id: 2, text: "Who am i?", isLink: true, link: "/about" },
      ],
      images: ["/images/profile.png"],
    }
  }
}
</script>

<template>
  <MyPage :title="pageData.title">
    <component :is="pageData.content.component" v-bind="pageData.content.props" />
  </MyPage>
</template>