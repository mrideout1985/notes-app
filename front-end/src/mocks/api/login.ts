import { rest } from 'msw'

export const login = [
	rest.post('http://localhost:3000/auth/login', (req, res, ctx) => {
		return res(ctx.status(200))
	}),
]
