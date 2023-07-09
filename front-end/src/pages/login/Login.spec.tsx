import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom' // to handle NavLink
import Login from './Login' // adjust this path as needed

test('user can login successfully', async () => {
	render(
		<Router>
			<Login />
		</Router>,
	)

	fireEvent.input(screen.getByLabelText('Email'), {
		target: {
			value: 'test@test.com',
		},
	})

	fireEvent.input(screen.getByLabelText('Password'), {
		target: {
			value: 'test123',
		},
	})

	fireEvent.click(
		screen.getByRole('button', {
			name: 'Sign in',
		}),
	)
})
