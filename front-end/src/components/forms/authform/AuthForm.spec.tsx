import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthForm from './AuthForm'

describe('AuthForm Component', () => {
	it('displays form validation message if the field is empty when form is submitted', async () => {
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

	it('should display validation errors if the email input field does not have a valid email address', async () => {
		render(
			<Router>
				<AuthForm action="register" />
			</Router>,
		)

		userEvent.type(screen.getByLabelText('Email'), 'test')

		userEvent.click(screen.getByRole('button', { name: /Sign up/i }))

		expect(
			await screen.findByText('Invalid email address'),
		).toBeInTheDocument()
	})

	it("should display a validation error if the password input field's value is password", async () => {
		render(
			<Router>
				<AuthForm action="register" />
			</Router>,
		)

		userEvent.type(screen.getByLabelText('Password'), 'password')

		userEvent.click(screen.getByRole('button', { name: /Sign up/i }))

		expect(
			await screen.findByText('Password cannot be "password"'),
		).toBeInTheDocument()
	})

	it("should display a validation error if the password input field's value is less than 8 characters and the form action is register", async () => {
		render(
			<Router>
				<AuthForm action="register" />
			</Router>,
		)

		userEvent.type(screen.getByLabelText('Password'), '123')

		userEvent.click(screen.getByRole('button', { name: /Sign up/i }))

		expect(
			await screen.findByText(
				'Password must be at least 8 characters long',
			),
		).toBeInTheDocument()
	})

	it("should display validation error if the email input field's value is more than 100 characters", async () => {
		render(
			<Router>
				<AuthForm action="register" />
			</Router>,
		)

		userEvent.type(
			screen.getByLabelText('Email'),
			'a'.repeat(101) + '@test.com',
		)

		userEvent.click(screen.getByRole('button', { name: /Sign up/i }))

		expect(
			await screen.findByText('Email cannot be more than 100 characters'),
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
