import type { NuxtError } from '#app'
import type { ErrorRequestHandler, Response } from 'express'

const runtime = useRuntimeConfig()

const errorDev = ({ name, statusCode, message }: NuxtError, res: Response) => {
	res.status(statusCode).json({ name, message })
}

const errorProd = (err: NuxtError, res: Response) => {
	if (!err.fatal && !!res)
		res.status(err.statusCode).json({
			name: err.name,
			message: err.message,
		})
	else
		res.status(500).json({
			name: err.name,
			message: 'Something went wrong',
		})
}

export const useExpressError: ErrorRequestHandler = (err, req, res) => {
	const error = { ...err } // copy error object

	if (err.name === 'Unauthorized') error.message = 'Not authorized request'
	if (err.name === 'PageNotFoundError') error.message = `${req.originalUrl} not found`
	if (!err.statusCode) error.statusCode = 500
	if (!err.message) error.message = 'Something went wrong'

	return runtime.public.NODE_ENV === 'production' ? errorProd(error, res) : errorDev(error, res)
}
