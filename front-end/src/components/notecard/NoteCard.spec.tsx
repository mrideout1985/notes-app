import { render } from '@testing-library/react'
import NoteCard, { NoteCardProps } from './NoteCard'

const mockData: NoteCardProps = {
	data: {
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

describe('<NoteCard/>', () => {
	it('displays a title when the title is given', () => {
		const screen = render(<NoteCard data={mockData.data} />)

		const title = screen.getByText('I love them')

		expect(title).toBeInTheDocument()
	})

	it('displays a description when the description is given', () => {
		const screen = render(<NoteCard data={mockData.data} />)

		const description = screen.getByText('cocks')

		expect(description).toBeInTheDocument()
	})
})
