export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.hook('vue:error', (...args) => {
		console.log({ args, 'vue:error':true })
	})
	nuxtApp.hook('app:error', (...args) => {
		console.log({ args, 'app:error':true })
	})
})
