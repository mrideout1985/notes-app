import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import NoteCardModal from './NoteCardModal'

const mockHandleOnClose = jest.fn()
const mockHandleOnSubmit = jest.fn()
const mockRefetch = {
	execute: jest.fn(() => Promise.resolve()),
}
const mockToggle = jest.fn()

describe('NoteCardModal', () => {
	it('should render a form with a title and description input and a submit button', () => {
		const screen = render(
			<NoteCardModal
				description="description"
				title="title"
				handleOnClose={mockHandleOnClose}
				handleOnSubmit={mockHandleOnSubmit}
				id={1}
				open={true}
				refetch={mockRefetch}
				toggle={mockToggle}
				key={1}
			/>,
		)
		expect(screen.getByLabelText('title')).toBeInTheDocument()
		expect(screen.getByLabelText('description')).toBeInTheDocument()
		expect(
			screen.getByRole('button', {
				name: 'Complete',
			}),
		).toBeInTheDocument()
	})

	it('should call the handleOnClose function when the close button is clicked', async () => {
		const screen = render(
			<NoteCardModal
				description="description"
				title="title"
				handleOnClose={mockHandleOnClose}
				handleOnSubmit={mockHandleOnSubmit}
				id={1}
				open={true}
				refetch={mockRefetch}
				toggle={mockToggle}
				key={1}
			/>,
		)
		const submitButton = screen.getByRole('button', {
			name: 'Complete',
		})

		act(() => {
			fireEvent.click(submitButton)
		})

		expect(mockHandleOnClose).toHaveBeenCalled()
	})
})
