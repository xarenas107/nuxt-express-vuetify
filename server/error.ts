import type { NitroErrorHandler } from 'nitropack'

export default <NitroErrorHandler>function (error, event) {
	event.node.res.end('Something went wrong')
}
