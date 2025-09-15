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
      text: "Hi, I’m <strong>Moh. Rofiqi</strong> — passionate about building <strong>smart</strong> and <strong>impactful systems</strong> with <strong>Web Development</strong>, <strong>AI</strong>, and <strong>IoT</strong>. I enjoy creating solutions that connect <strong>software</strong>, <strong>hardware</strong>, and <strong>people</strong>, while also sharing knowledge through <strong>teaching</strong> and <strong>collaboration.</strong>",
      link: "https://example.com",
      linkText: "Download CV",
      figure: {
        component: "img",
        src: "https://a.storyblok.com/f/287010177550645/1024x1024/f5aa221555/profile-image.jpeg",
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
        { tag: "ai", label: "ai" },
        { tag: "arduino", label: "arduino" },
      ],
      projects: [
        {
          id: "1",
          title: "Nuxt 4 Portfolio",
          description: "A modern portfolio built with Nuxt 4 and GSAP.",
          tags: ["web"],
          media: {
            id: "img1",
            url: "https://a.storyblok.com/f/287010177550645/1365x599/1c6177be83/projects1.png",
            alt: "Nuxt Portfolio Screenshot",
          },
          demo: "https://portfolio-2025-nine-alpha.vercel.app/",
          code: "https://github.com/ficilabs/portfolio-2025",
        },
        {
          id: "2",
          title: "QR Code Attendance",
          description: "A QR Code attendance system using laravel framework and adminLTE.",
          tags: ["web"],
          media: {
            id: "img2",
            url: "https://a.storyblok.com/f/287010177550645/1365x603/f2d609a5f6/project2.png",
            alt: "Mobile App Screenshot",
          },
          demo: "https://mobile.example.com",
          code: "https://github.com/example/mobile-app",
        },
        {
          id: "3",
          title: "Multiple Choise Scannner",
          description: "Using OCR technic to extract the image and using Streamlite platform for deployment.",
          tags: ["ai", "web"],
          media: {
            id: "img3",
            url: "https://a.storyblok.com/f/287010177550645/1361x599/33d6c5f1c4/project3.png",
            alt: "Design System Screenshot",
          },
          demo: "https://rofiqi.streamlit.app/",
          code: "https://github.com/ficilabs/quizscanner",
        },
        {
          id: "4",
          title: "Prototype Traffict Light",
          description: "Using using fuzzy logic and microcontroller to control flow of the intersection.",
          tags: ["ai", "arduino"],
          media: {
            id: "img4",
            url: "https://a.storyblok.com/f/287010177550645/1356x626/dc434acded/project4.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "5",
          title: "Smart Dustbin V2",
          description: "Using Camera to classify the waste object then sort using mechanical motor.",
          tags: ["ai", "arduino"],
          media: {
            id: "img5",
            url: "https://a.storyblok.com/f/287010177550645/1364x633/a849fc19a3/project5.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "6",
          title: "Trivia Quiz API",
          description: "Using travia api and boostrap 4 to make entertaining quiz game.",
          tags: ["web"],
          media: {
            id: "6",
            url: "https://a.storyblok.com/f/287010177550645/1365x598/f655bf76a2/project6.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "7",
          title: "Prototype Smarthome",
          description: "Using BLYNK app and esp822 to control equipment on home.",
          tags: ["arduino", "web"],
          media: {
            id: "img7",
            url: "https://a.storyblok.com/f/287010177550645/1362x632/69d5cfbfe2/project7.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "8",
          title: "Object Classification using FOMO algorithm",
          description: "Using costume mobilenet V2 Layers to clasify image.",
          tags: ["ai", "arduino"],
          media: {
            id: "img8",
            url: "https://a.storyblok.com/f/287010177550645/1361x599/33d6c5f1c4/project3.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "9",
          title: "Smart Box Control",
          description: "Using MQTT broker and esp32 to control light on building.",
          tags: ["arduino", "web"],
          media: {
            id: "img9",
            url: "https://a.storyblok.com/f/287010177550645/1361x599/33d6c5f1c4/project3.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "9",
          title: "Hudifier System",
          description: "Using Hysteresis to control humidifier tobbaco inside container to keep it on best value.",
          tags: ["ao", "web", "arduino"],
          media: {
            id: "img9",
            url: "https://a.storyblok.com/f/287010177550645/1361x599/33d6c5f1c4/project3.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "10",
          title: "Islamic Event order",
          description: "Buiild using laravel 12 to help people to order hadrah and sholawat on majlis",
          tags: ["web"],
          media: {
            id: "img10",
            url: "https://a.storyblok.com/f/287010177550645/1361x599/33d6c5f1c4/project3.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "11",
          title: "Chiken Feeder Automation",
          description: "Using BLYNK platform to automation feed schedule for chinken.",
          tags: ["arduino", "web"],
          media: {
            id: "img11",
            url: "https://a.storyblok.com/f/287010177550645/1361x599/33d6c5f1c4/project3.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "12",
          title: "RFID Attendance System",
          description: "Build with Sweetalert.js and sneat bootstrap template",
          tags: ["web"],
          media: {
            id: "img9",
            url: "https://a.storyblok.com/f/287010177550645/1362x591/2385e68b61/project12.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
        },
        {
          id: "13",
          title: "Digit Recognition",
          description: "Build with Bootstrap 5 and costume CNN layers",
          tags: ["web"],
          media: {
            id: "img9",
            url: "https://a.storyblok.com/f/287010177550645/1359x594/cc5000dc69/project13.png",
            alt: "Design System Screenshot",
          },
          demo: "#",
          code: "#",
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