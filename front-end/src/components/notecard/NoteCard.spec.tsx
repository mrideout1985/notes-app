import { render } from '@testing-library/react'
import NoteCard, { NoteCardProps } from './NoteCard'

const mockData: NoteCardProps = {
	note: {
		authorEmail: 'cockhunter',
		body: '',
		createdAt: String(new Date()),
		description: 'cocks',
		title: 'I love them',
		id: 1,
		published: false,
		updatedAt: String(new Date()),
	},
	removeNote: () => {},
	refetch: { execute: () => Promise.resolve() },
}

const mockRefetch = {
	execute: () => Promise.resolve(),
}
const mockRemoveNote = jest.fn()

describe('<NoteCard/>', () => {
	it('displays a title when the title is given', () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch}
				removeNote={mockRemoveNote}
				note={mockData.note}
			/>,
		)

		const title = screen.getByText('I love them')

		expect(title).toBeInTheDocument()
	})

	it('displays a description when the description is given', () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch}
				removeNote={mockRemoveNote}
				note={mockData.note}
			/>,
		)
		const description = screen.getByText('cocks')

		expect(description).toBeInTheDocument()
	})

	it("should allow the user to delete the note when the 'Delete' button is clicked", () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch}
				removeNote={mockRemoveNote}
				note={mockData.note}
			/>,
		)

		const deleteButton = screen.getByText('Delete')

		deleteButton.click()

		expect(mockRemoveNote).toHaveBeenCalled()
	})

	it("should allow the user to edit the note and bring up the edit note modal when the 'Edit' button is clicked", async () => {
		const screen = render(
			<NoteCard
				refetch={mockRefetch}
				removeNote={mockRemoveNote}
				note={mockData.note}
			/>,
		)

		const editButton = screen.getByText('Edit')

		editButton.click()

		const modal = await screen.findByRole('dialog')

		expect(modal).toBeInTheDocument()
	})
})
