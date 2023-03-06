require('dotenv').config()
const { join } = require('path')
const { copySync, removeSync } = require('fs-extra')

module.exports = {
  ssr: true,

  srcDir: __dirname,

  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
    appName: process.env.APP_NAME || 'Alloro - eat & love',
    appLocale: process.env.APP_LOCALE || 'ru',
    githubAuth: !!process.env.GITHUB_CLIENT_ID,
    imagesBaseUrl: process.env.BASE_URL,
  },
 

  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return{
      
      // title: process.env.APP_NAME,
      title: "Alloro - Eat & Love | лучшие итальянские блюда в Одессе. Доставка пиццы",
      // titleTemplate: '%s - ' + process.env.APP_NAME,
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favi-icons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes:'57x57',  href: '/favi-icons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes:'60x60',  href: '/favi-icons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes:'72x72',  href: '/favi-icons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes:'76x76',  href: '/favi-icons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes:'114x114',  href: '/favi-icons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes:'120x120',  href: '/favi-icons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes:'144x144',  href: '/favi-icons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes:'152x152',  href: '/favi-icons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes:'180x180',  href: '/favi-icons/apple-icon-180x180.png' },
        { rel: 'icon', type:'image/png', sizes:'192x192',  href: '/favi-icons/android-icon-192x192.png' },
        { rel: 'icon', type:'image/png', sizes:'32x32',  href: '/favi-icons/favicon-32x32.png' },
        { rel: 'icon', type:'image/png', sizes:'96x96',  href: '/favi-icons/favicon-96x96.png' },
        { rel: 'icon', type:'image/png', sizes:'16x16',  href: '/favi-icons/favicon-16x16.png' },
      ],
    }
  },

  loading: { color: '#007bff' },

  router: {
    middleware: [
      'check-auth'
    ]
  },

  css: [
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
  ],

  plugins: [
    '~components/global',
    '~plugins/vform',
    '~plugins/axios',
    '~plugins/fontawesome',
    '~plugins/nuxt-client-init',
    { src: '~plugins/nuxt-quill-plugin', ssr: false },
    { src: '~plugins/i18n.js' }
  ],

  modules: [
    '@nuxtjs/router',
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'ru', 
            iso: 'ru-RU',
            file: 'ru.js', 
          },
          {
            code: 'ua', 
            iso: 'ua-UA',
            file: 'ua.js', 
          },
        ],
        langDir: 'lang/',
        strategy: 'prefix_except_default',
        defaultLocale: 'ru',
        vueI18n: {
          fallbackLocale: 'ru',
        }
      }
    ],
    '@nuxtjs/google-analytics'
  ],

  
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  



  build: {
    extractCSS: true
  },

  hooks: {
    generate: {
      done (generator) {
        // Copy dist files to public/_nuxt
        if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === 'spa') {
          const publicDir = join(generator.nuxt.options.rootDir, 'public', '_nuxt')
          removeSync(publicDir)
          copySync(join(generator.nuxt.options.generate.dir, '_nuxt'), publicDir)
          copySync(join(generator.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
          removeSync(generator.nuxt.options.generate.dir)
        }
      }
    }
  },
}
