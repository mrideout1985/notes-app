import { rest } from 'msw'

export const loginHandler = rest.post(
	'http://localhost:3000/auth/login',
	(req, res, ctx) => {
		return res(ctx.status(201))
	},
)

export const registerHandler = rest.post(
	'http://localhost:3000/auth/register',
	(req, res, ctx) => {
		return res(ctx.status(201))
	},
)

export const handlers = [loginHandler, registerHandler]
