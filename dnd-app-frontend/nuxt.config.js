import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 8080
  },
  head: {
    titleTemplate: '%s - D&D 3.5 for engineers',
    title: 'D&D 3.5 for engineers',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'the ultimate app for D&D 3.5' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  loading: '~/components/Loading.vue',
  css: [
    '~/assets/main.css'
  ],
  plugins: [
    '~/plugins/vue-debounce',
    '~/plugins/vue-draggable-resizable',
    '~/plugins/i18n'
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    'nuxt-material-design-icons',
    '@nuxtjs/axios',
  ],
  router: {
    middleware: 'i18n'
  },
  generate: {
    routes: ['/', '/about', '/it', '/it/about']
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://dnd-app'
  },
  axios: {
    baseURL: process.env.BASE_URL
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        dark: {
          primary: '#41b883',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#41b883'
        }
      }
    }
  }
}
