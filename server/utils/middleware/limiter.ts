import { RateLimiterMemory } from 'rate-limiter-flexible'

const runtime = useRuntimeConfig()

class Limiter extends RateLimiterMemory {
	constructor({ points, duration }: { [key: string]: number }) {
		super({ keyPrefix: 'middleware', points, duration })
	}
}

const limiter = (item: RateLimiterMemory, { message }: { [key: string]: string }) => {
	return defineExpressMiddleware((req, res, next) => {
		item.consume(req.ip)
			.then(() => next())
			.catch(() => res.status(429).json(message))
	})
}

export const rateLimiter = limiter(
	new RateLimiterMemory({ points: 250, duration: 60 * 60 }),
	{ message: 'TooManyRequests' }
)
