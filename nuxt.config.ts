// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/styles/styles.scss',
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  modules: ['@nuxtjs/google-fonts', '@nuxt/image'],
  googleFonts: {
    download: true,
    preload: true,
    overwriting: true,
    families: {
      'Open Sans': {
        wght: [300, 700],
      },
      'Jost': {
        wght: [700],
      }
    }
  },
})