import { rest } from 'msw';
const login = rest.post('http://localhost:3000/auth/login', (req, res, ctx) => {
    const { email, password } = JSON.parse(req.body);
    if (password === 'bigtestypassword' && email === 'test@test.com') {
        return res(ctx.status(201), ctx.json({
            status: 'success',
            user: { email: 'test@test.com', id: '1' },
            Authorization: 'Bearer token',
        }));
    }
});
export const handlers = [login];
