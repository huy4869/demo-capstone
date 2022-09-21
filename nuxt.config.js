export default {
  server: {
    port: process.env.LISTEN_PORT || 8000,
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ez Solution',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/index.scss',
    'aos/dist/aos.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/permission.js',
    { src: '@/plugins/aos.js', ssr: false },
    '@/plugins/vue-slick-carousel.js',
    { src: '@/plugins/vue-tree-chart.js', ssr: false },
    { src: '@/plugins/infiniteloading.js', ssr: false }
  ],

  // middleware route
  router: {
    middleware: [
      'i18n'
    ],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/device',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
    '@nuxtjs/recaptcha'
  ],
  recaptcha: {
    hideBadge: false,
    language: 'vn',
    siteKey: process.env.KEY_CAPTCHA,
    version: 1,
    size: 'normal'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false
  },

  auth: {
    strategies: {
      local: {
        token: {
          maxAge: 31536000
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'data.access_token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/me', method: 'get', propertyName: 'data' }
        }
      }
    },
    plugins: [
      '~/plugins/axios.js'
    ],
    redirect: {
      login: '/#login',
      logout: false,
      callback: '/#login',
      home: false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
}
