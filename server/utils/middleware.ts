import type { RequestHandler } from 'express'
export const defineExpressMiddleware = (fn: RequestHandler) => expressAsyncHandler(fn)
