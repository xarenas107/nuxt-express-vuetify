export default defineExpressMiddleware((req, res, next) => {
	if (req.protocol === 'http') res.redirect(`${'https://' + req.get('host')}`)
	else next()
})
