import { rest } from 'msw'

export const handlers = [
	rest.post('http://localhost:3000/auth/login', (req, res, ctx) => {
		const { email, password } = JSON.parse(req.body as string)

		if (password === 'test123' && email === 'test@test.com') {
			return res(
				ctx.status(201),
				ctx.json({
					status: 'success',
					user: { email: 'test@test.com', id: '1' },
					Authorization: 'Bearer token',
				}),
			)
		} else {
			return res(
				ctx.status(400),
				ctx.json({ message: 'Invalid credentials' }),
			)
		}
	}),

	rest.post('/api/auth/login', (req, res, ctx) => {
		return res(
			ctx.json({
				data: {
					user: { email: 'test@test.com', id: '1' },
					Authorization: 'token',
				},
			}),
			ctx.status(201),
		)
	}),

	rest.post('/api/auth/register', (req, res, ctx) => {
		return res(ctx.json({ status: 201 }))
	}),
]
