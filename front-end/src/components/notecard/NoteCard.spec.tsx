import { render } from '@testing-library/react'
import NoteCard from './NoteCard'

const mockData = {
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
}

const mockRemoveNote = jest.fn()

describe('<NoteCard/>', () => {
	it('displays a title when the title is given', () => {
		const screen = render(
			<NoteCard note={mockData.note} removeNote={mockRemoveNote} />,
		)

		const title = screen.getByText('I love them')

		expect(title).toBeInTheDocument()
	})

	it('displays a description when the description is given', () => {
		const screen = render(
			<NoteCard note={mockData.note} removeNote={mockRemoveNote} />,
		)
		const description = screen.getByText('cocks')

		expect(description).toBeInTheDocument()
	})

	it("doesn't display a title when the title is not given", () => {
		const screen = render(
			<NoteCard
				note={{ ...mockData.note, title: '' }}
				removeNote={mockRemoveNote}
			/>,
		)

		const title = screen.queryByText('I love them')

		expect(title).not.toBeInTheDocument()
	})
})
