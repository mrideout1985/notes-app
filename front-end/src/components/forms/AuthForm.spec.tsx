import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthForm from './AuthForm'

describe('AuthForm Component', () => {
	it('form validation works correctly', async () => {
		render(
			<Router>
				<AuthForm action="login" />
			</Router>,
		)

		userEvent.click(screen.getByRole('button', { name: /Sign in/i }))

		expect(await screen.findByText('Email is required')).toBeInTheDocument()

		expect(
			await screen.findByText('Password is required'),
		).toBeInTheDocument()
	})

	it('navigation links work correctly', () => {
		render(
			<Router>
				<AuthForm action="register" />
			</Router>,
		)

		expect(screen.getByText('Already have an account?')).toBeInTheDocument()
		expect(screen.getByText('Sign in')).toHaveAttribute('href', '/login')
	})

	it("renders the correct title depending if the action prop is 'register'", () => {
		render(
			<Router>
				<AuthForm action="register" />
			</Router>,
		)

		expect(screen.getByRole('link')).toHaveTextContent('Sign in')
		expect(
			screen.getByRole('button', {
				name: 'Sign up',
			}),
		)
	})

	it("renders the correct title depending if the action prop is 'login'", () => {
		render(
			<Router>
				<AuthForm action="login" />
			</Router>,
		)

		expect(screen.getByRole('link')).toHaveTextContent('Sign up')
		expect(
			screen.getByRole('button', {
				name: 'Sign in',
			}),
		)
	})
})
