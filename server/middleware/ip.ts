export default defineEventHandler(event => {
	const { ip, socket } = event.node.req
	event.node.req.ip = ip || getHeader(event, 'x-forwarded-for') || socket.remoteAddress
})
