import { render } from '@testing-library/react'
import NoteCard, { NoteCardProps } from './NoteCard'

const mockData: NoteCardProps = {
	note: {
		authorEmail: 'cockhunter',
		createdAt: new Date(),
		description: 'cocks',
		title: 'I love them',
		id: '1',
		published: false,
		updatedAt: new Date(),
	},
	removeNote: () => {},
	refetch: () => {},
	handleSubmit: undefined,
	resetField: undefined,
	register: undefined,
	user: undefined,
	handleCloseModal: function (): void {
		throw new Error('Function not implemented.')
	},
	handleOpenModal: function (): void {
		throw new Error('Function not implemented.')
	},
	openModal: false,
}

const mockRefetch = {
	execute: (): void => {},
}

const mockRemoveNote = jest.fn()
const mockHandleSubmit = jest.fn()
const mockResetField = jest.fn()
const mockRegister = jest.fn()
const mockUser = jest.fn()
const mockHandleCloseModal = jest.fn()
const mockHandleOpenModal = jest.fn()

const openModal = false

describe('<NoteCard/>', () => {
	it('displays a title when the title is given', () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch.execute}
				removeNote={mockRemoveNote}
				note={mockData.note}
				handleSubmit={mockHandleSubmit}
				resetField={mockResetField}
				register={mockRegister}
				user={mockUser}
				handleCloseModal={mockHandleCloseModal}
				handleOpenModal={mockHandleOpenModal}
				openModal={false}
			/>,
		)

		const title = screen.getByText('I love them')

		expect(title).toBeInTheDocument()
	})

	it('displays a description when the description is given', () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch.execute}
				removeNote={mockRemoveNote}
				note={mockData.note}
				handleSubmit={mockHandleSubmit}
				resetField={mockResetField}
				register={mockRegister}
				user={mockUser}
				handleCloseModal={mockHandleCloseModal}
				handleOpenModal={mockHandleOpenModal}
				openModal={false}
			/>,
		)
		const description = screen.getByText('cocks')

		expect(description).toBeInTheDocument()
	})

	it("should allow the user to edit the note and bring up the edit note modal when the 'Edit' button is clicked", async () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch.execute}
				removeNote={mockRemoveNote}
				note={mockData.note}
				handleSubmit={mockHandleSubmit}
				resetField={mockResetField}
				register={mockRegister}
				user={mockUser}
				handleCloseModal={mockHandleCloseModal}
				handleOpenModal={mockHandleOpenModal}
				openModal={false}
			/>,
		)

		const editButton = screen.getByText('Edit')

		editButton.click()

		const modal = await screen.findByRole('dialog')

		expect(modal).toBeInTheDocument()
	})

	it("should allow the user to delete the note when the 'Delete' button is clicked", () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch.execute}
				removeNote={mockRemoveNote}
				note={mockData.note}
				handleSubmit={mockHandleSubmit}
				resetField={mockResetField}
				register={mockRegister}
				user={mockUser}
				handleCloseModal={mockHandleCloseModal}
				handleOpenModal={mockHandleOpenModal}
				openModal={false}
			/>,
		)

		const deleteButton = screen.getByText('Delete')

		deleteButton.click()

		expect(mockRemoveNote).toHaveBeenCalled()
	})

	it("should allow the user to submit a note when the cursor is clicked outside of the  'Edit Note' modal", () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch.execute}
				removeNote={mockRemoveNote}
				note={mockData.note}
				handleSubmit={mockHandleSubmit}
				resetField={mockResetField}
				register={mockRegister}
				user={mockUser}
				handleCloseModal={mockHandleCloseModal}
				handleOpenModal={mockHandleOpenModal}
				openModal={false}
			/>,
		)

		const editButton = screen.getByText('Edit')

		editButton.click()

		const modal = screen.getByRole('dialog')

		modal.click()

		expect(mockHandleSubmit).toHaveBeenCalled()
	})
})
