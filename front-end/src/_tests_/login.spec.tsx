import Login from '@/pages/Login'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { BrowserRouter, useLocation } from 'react-router-dom'

const Wrapper = (props: any) => {
	const formMethods = useForm()

	return <FormProvider {...formMethods}>{props.children}</FormProvider>
}

const mockLogin = jest.fn()

describe('Login', () => {
	it('should allow a user to login', async () => {
		const screen = render(
			<BrowserRouter>
				<Wrapper>
					<Login />
				</Wrapper>
			</BrowserRouter>,
		)
		const loginButton = screen.getByRole('button', {
			name: 'Login',
		})

		fireEvent.change(screen.getByLabelText('email'), {
			target: { value: 'cocks@123.com' },
		})
		fireEvent.change(screen.getByLabelText('password'), {
			target: { value: 'cocksniper1234' },
		})

		fireEvent.click(loginButton)

		const response = await waitFor(() => {
			return fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email: 'cocks@123.com',
					password: 'cocksniper1234',
				}),
			})
		})

		expect(response.status).toReturnWith({ message: 'Login successful' })
	})
})
