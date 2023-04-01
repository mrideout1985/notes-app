import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserNavDropdown from './UserNavDropdown'

const handleLogout = jest.fn()
const currentUser = {
	token: 'token',
	email: 'email',
	id: 'id',
}

describe('UserNavDropdown', () => {
	it('should display a dropdown menu when clicked', async () => {
		const screen = render(
			<UserNavDropdown
				currentUser={currentUser}
				handleLogout={handleLogout}
			/>,
		)

		const profileButton = screen.getByRole('button', {
			name: 'dropdown button',
		})

		userEvent.click(profileButton)

		const profileMenu = await screen.findByRole('menu')

		expect(profileMenu).toBeInTheDocument()
	})
})
