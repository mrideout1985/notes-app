import { login } from '@/api/services/services'
import { fireEvent, render } from '@testing-library/react'
import { S } from 'msw/lib/SetupServerApi-39df862c'
import { setupServer } from 'msw/node'
import { useClickAway } from 'react-use'
import { loginHandler } from '../mocks/handlers'
import Login from './Login'

describe('Login', () => {
	let server: S

	beforeAll(() => {
		server = setupServer(loginHandler)

		server.listen()
	})

	afterAll(() => {
		server.close()
	})

	it('should return a successful response', async () => {
		const screen = render(<Login />)

		const submitButton = screen.getByRole('button', { name: 'Submit' })

		fireEvent.click(submitButton)

		expect(screen.getByTestId('message')).toHaveTextContent(
			'Login successful',
		)
	})
})
