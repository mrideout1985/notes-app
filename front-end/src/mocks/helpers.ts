import { RestHandler, rest } from 'msw'

export const makeServerErrorResponseGet = (
	handler: RestHandler,
	statusCode?: number,
	message?: string,
) => {
	return rest.get(handler.info.path, (_req, res, ctx) =>
		res(
			ctx.status(statusCode || 500),
			ctx.json({ message: message || 'Server Error' }),
		),
	)
}

export const makeServerErrorResponsePost = (
	handler: RestHandler,
	statusCode?: number,
	message?: string,
) => {
	return rest.post(handler.info.path, (_req, res, ctx) =>
		res(
			ctx.status(statusCode || 500),
			ctx.json({ message: message || 'Server Error' }),
		),
	)
}
