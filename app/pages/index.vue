<template>
  <MyPage title="Projects">
    <MyProjectList
      :filters="[
        { tag: 'show-all', label: 'All' },
        { tag: 'web', label: 'Web' },
        { tag: 'mobile', label: 'Mobile' }
      ]"
      :projects="[
        {
          id: '1',
          title: 'Nuxt Website',
          description: 'A cool Nuxt project',
          tags: ['web'],
          demo: 'https://example.com/demo1',
          code: 'https://github.com/example/nuxt-website',
          media: {
            id: 'media-1',
            url: 'https://www.marloncureg.com/wp-content/uploads/2017/04/3d-web.jpg',
            alt: 'Nuxt Website'
          }
        },
        {
          id: '2',
          title: 'Vue App',
          description: 'A Vue.js mobile app',
          tags: ['mobile'],
          demo: 'https://example.com/demo2',
          code: 'https://github.com/example/vue-app',
          media: {
            id: 'media-2',
            url: 'https://github.blog/wp-content/uploads/2020/12/102573836-33a1fb80-40a4-11eb-8c77-e2d328f0a570.gif?resize=640%2C400',
            alt: 'Vue App'
          }
        }
      ]"
    />
  </MyPage>
</template>
