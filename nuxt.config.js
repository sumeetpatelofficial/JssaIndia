import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - JssaIndia',
    title: 'JssaIndia',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/toast",
    "~/plugins/vue-inject.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: "AIzaSyCyx-utfvu0DA8p67aJ9L85P_aQrJMG3Qw",
      authDomain: "jssaindia.firebaseapp.com",
      projectId: "jssaindia",
      storageBucket: "jssaindia.appspot.com",
      messagingSenderId: "190022895301",
      appId: "1:190022895301:web:787cb76e75a24b9a4652ac"
    },
    services: {
      auth: {
        persistence: "local", // default
        // it is recommended to configure either a mutation or action but you can set both
        initialize: {
          onAuthStateChangedAction: "onAuthStateChangedAction",
        },
        ssr: false, // default
      },
      firestore: true,
      storage: true,
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#F36705",
          primary_dark: "#001220",
          paragraph:'#798192',
          info:'#00C2FF',
          error: "#DA1212",
          warning: "#FF8C32",
          success:'#4ED459',
          white: "#ffffff",
          black: "#000000",
          grey:'#798192',
          lightgrey: "#D9DEE4",
          neutralgrey: "#BBC0C7",
          neutralgrey1: "#A4A9AE",
          neutralgrey2: "#5B5D72",
        },
      }
    }
  },
  googleFonts: {
    families: {
      Satisfy: true,
      Inter: {
        wght: [300, 400, 500, 600, 700, 800, 900],        
      },
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
