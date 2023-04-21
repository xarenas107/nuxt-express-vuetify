import express from 'express'
import compression from 'compression'
import type { Application, Request, Response, NextFunction } from 'express'

// security
import helmet from 'helmet'
import hpp from 'hpp'

import { router } from '../router'
const runtime = useRuntimeConfig()

class Server {
	public app: Application
	public path: string

	constructor() {
		this.app = express()
		this.path = '/api'

		this.database()
		this.middlewares()
		this.routes()
		this.error()
	}

	database() {
    // Database connection
	}

	middlewares() {
		this.app.set('query parser', 'extended')
		this.app.set('x-powered-by', false)

		if (runtime.public.NODE_ENV === 'production') {
			this.app.set('trust proxy', 1) // trust first proxy
			this.app.use(https) // redirect http to https protocol
		}

		this.app.use(cors) // cross-site requests
		this.app.use(compression({ level: 9 })) // compress request
		this.app.use(rateLimiter)
		this.app.use(express.json({ limit: '30kb' })) // limit body size
		this.app.use(express.urlencoded({ extended: true, limit: '30kb' }))

		this.app.use(helmet()) // secure http headers
		this.app.use(hpp({ whitelist: ['_id', 'or'] })) // prevent http param pollution
	}

	error() {
		this.app.use(() => {
			throw newError('PageNotFoundError')
		})

		this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			const expresErrorHandler = useExpressErrorHandler()
			if (!expresErrorHandler.isTrustedError(err)) err = newError(err)
			expresErrorHandler.handle(err, req, res, next)
		})
	}

	routes() {
		this.app.use(this.path, router)
	}
}

const { app } = new Server()
export default fromNodeMiddleware(app)
