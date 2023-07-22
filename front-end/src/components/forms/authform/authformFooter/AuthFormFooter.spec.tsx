import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthFormFooter from './AuthFormFooter'

describe('AuthFormFooter', () => {
	it('should render the correct text if the action prop is register', () => {
		const screen = render(
			<Router>
				<AuthFormFooter action="register" />
			</Router>,
		)

		expect(screen.getByRole('button')).toHaveTextContent('Sign up')
	})

	it('should render the correct text if the action prop is login', () => {
		const screen = render(
			<Router>
				<AuthFormFooter action="login" />
			</Router>,
		)

		expect(screen.getByRole('button')).toHaveTextContent('Sign in')
	})
})
