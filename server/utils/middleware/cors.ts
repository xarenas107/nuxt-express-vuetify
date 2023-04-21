import cors from 'cors'

export default cors({
	origin: '*',
	credentials: true,
	exposedHeaders: ['Content-Disposition', 'Content-Length'],
})
