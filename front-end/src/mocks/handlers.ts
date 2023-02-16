// src/mocks/handlers.js
import { rest } from 'msw'

export const loginHandler = rest.post(
	'http://localhost:3000/auth/login',
	(req, res, ctx) => {
		const request = req.json()

		console.log(request)

		// if (login !== 'test@example.com') {
		// 	return res(ctx.status(401), ctx.json({ success: false }))
		// }

		return res(ctx.json({ success: true }))
	},
)
