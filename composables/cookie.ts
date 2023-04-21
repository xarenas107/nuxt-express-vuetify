type T = typeof useCookie

export const useNuxtCookie: T = (name, options?) => {
    const runtime = useRuntimeConfig()
    const isProduction = runtime.public.NODE_ENV === 'production'
    const maxAge = 60 * 60 * 24 * 365
    
    options = options || {}
    options.maxAge = options?.maxAge ?? maxAge
    options.expires = options.expires ?? new Date(Date.now() + maxAge * 1000)
    options.sameSite = options?.sameSite ?? true
    // options.httpOnly = options?.httpOnly ?? true
    options.secure = options?.secure ?? isProduction

	return useCookie(name,options)
}
