import { RequestHandler } from 'express'

export const expressAsyncHandler = (fn: Function): RequestHandler => {
    return function (req, res, next?) {
		const fnReturn = fn(req, res, next)
		return Promise.resolve(fnReturn).catch(next)
	}
}
