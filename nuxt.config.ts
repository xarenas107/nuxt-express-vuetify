import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    ssr:false,
    appConfig: { performance: true },
    nitro:{
        compressPublicAssets: {
            gzip: true,
            brotli: true,
        },
        errorHandler: '~/error',
    },
    runtimeConfig:{
        PORT: Number(process.env.PORT) || 3000,
        
        public: {
            NODE_ENV: process.env.NODE_ENV || 'production',
        }
    },
    imports: {
		dirs: ['./store'],
	},
    hooks: {
        'vite:extendConfig': config => { config.plugins?.push(vuetify()) },
    },
    modules: [
        '@nuxtjs/html-validator',
        '@vite-pwa/nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@nuxtjs/google-fonts',
        '@vueuse/nuxt',
        'nuxt-vitest',
    ],
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    typescript: { strict: true },
    build: {
		transpile: ['vuetify'],
	},
    vueuse:{ ssrHandlers: true, },
    htmlValidator: {
        usePrettier: false,
        logLevel: 'verbose',
        failOnError: false,
        options: {
            extends: ['html-validate:document', 'html-validate:recommended', 'html-validate:standard'],
            rules: {
                'svg-focusable': 'off',
                'no-unknown-elements': 'error',
                // Conflicts or not needed as we use prettier formatting
                'void-style': 'off',
                'no-trailing-whitespace': 'off',
                // Conflict with Nuxt defaults
                'require-sri': 'off',
                'attribute-boolean-style': 'off',
                'doctype-style': 'off',
                // Unreasonable rule
                'no-inline-style': 'off',
            },
        },
    },
    vite:{
        ssr: { noExternal: ['vuetify'] },
        define: { 'process.env.DEBUG': false },
    },
    googleFonts:{
        families: {
            Roboto: [100, 300, 400, 500, 700, 900],
            'Bebas+Neue': [700]
        },
        download: true,
        prefetch: true,
        preconnect: true,
        preload: true,
        useStylesheet: false,
        inject: true,
        overwriting: false,
        base64: true,
    },
    pwa: {
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        devOptions: {
            enabled: process.env.NODE_ENV === 'development',
            type: 'module',
        },
        manifest: {
            name: 'name',
            short_name: 'description',
            description: 'name - description',
            theme_color: '#2e2e2e',
            display: 'fullscreen',
            icons: []
        },
        workbox: {
            navigateFallback: '/',
        },
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs', 'definePiniaStore'],
    },
    i18n:{
        strategy: 'no_prefix',
        locales: [
            {
                name: 'English',
                code: 'en',
                iso: 'en-US',
                file: 'en.json',
            },
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locale',
        detectBrowserLanguage: {
            alwaysRedirect: true,
            fallbackLocale: 'en',
            useCookie: true,
            cookieKey: 'locale',
            cookieSecure: process.env.NODE_ENV === 'production',
        },
    }
    
})
