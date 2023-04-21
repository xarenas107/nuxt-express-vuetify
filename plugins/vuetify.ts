// Composables
import { createVuetify, VuetifyOptions } from 'vuetify'
import * as labs from 'vuetify/labs/components'

// Blueprints
import { md3 } from 'vuetify/blueprints'

// Internationalization (i18n)
import { en, es, pt } from 'vuetify/locale'

const useDefaults = ():VuetifyOptions['defaults'] => ({
	VChip: {
		rounded: 'pill',
	},
	VBtn: {
		color:'on-surface'
	},
	VSelect: {
		menuIcon: 'mdi-chevron-down',
	},
	VSlider: {
		color: 'primary',
	},
	VExpansionPanel: {
		elevation: 0,
		rounded: 'lg',
	},
	VExpansionPanels: {
		elevation: 0,
		rounded: 'lg',
	},
	VSheet: { rounded: 'lg' },
	VCard: {
		elevation: 0,
		rounded: 'lg',
	},
	VAlert: { rounded: 'lg' },
	VBtnToggle: {
		density: 'compact',
		color: 'primary',
		variant: 'text',
		bgColor: 'surface',
		rounded: 'pill',
	},
	VTextarea: {
		color: 'primary',
	},
})

const useTheme = (): VuetifyOptions['theme'] => ({
	defaultTheme: useColorMode({ storageKey: 'theme' }).value,
	themes: {
		light: {
			dark: false,
			colors: {},
		},
		dark: {
			colors: {},
		},
	},
})

const useLocale = ():VuetifyOptions['locale'] => ({
	locale: useNuxtCookie('locale', {
		default: () => useBrowserLocale() || 'en',
	}).value,
	messages: { en, es, pt },
})

export default defineNuxtPlugin(nuxt => {
	const vuetify = createVuetify({
		ssr: true,
		components: { ...labs },
		blueprint: md3,
		locale: useLocale(),
		defaults: useDefaults(),
		theme: useTheme(),
	})

	nuxt.provide('vuetify', vuetify)
	nuxt.vueApp.use(vuetify)
})

