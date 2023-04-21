import type { NextFunction, Request, Response } from 'express'
import { H3Error } from 'h3'
import { useExpressError } from './controller'

class ExpressError extends H3Error {
	statusCode: number
	statusMessage: string | undefined
	status: 'fail' | 'error'
	isOperational: boolean

	constructor(
		error: Partial<H3Error> | string = 'Error',
		statusCode = 0,
		cause = undefined,
		statusMessage = undefined
	) {
		super(typeof error === 'string' ? error : error.message)
		Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

		this.statusCode = typeof error === 'string' ? statusCode : error.statusCode ?? 500
		this.cause = typeof error === 'string' ? cause : error.cause
		this.statusMessage = typeof error === 'string' ? statusMessage : error.statusMessage
		this.name = typeof error === 'string' ? error : error.name || 'Error'
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
		this.isOperational = true
		Error.captureStackTrace(this)

		this.statusCodeHandler()
	}

	statusCodeHandler() {
		if (this.statusCode) return
		if (!this.statusCode) this.statusCode = 500
        if (!this.message) this.message = 'Something went wrong'
	}
}

class ExpressErrorHandler {
	public handle(err: Partial<ExpressError>, req: Request, res: Response, next: NextFunction) {
		useExpressError(err, req, res, next)
	}
	public isTrustedError(error: Partial<ExpressError>) {
		if (error instanceof ExpressError) return error.isOperational
		return false
	}
}

export const newError = (...args: (Error | Partial<H3Error> | string)[]) => new ExpressError(...args)
export const useExpressErrorHandler = () => new ExpressErrorHandler()
