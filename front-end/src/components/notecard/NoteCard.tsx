import { deleteNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { MouseEventHandler } from 'react'
import { Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap'
import styles from './NoteCard.module.scss'

interface Data {
	body: string
	createdAt: string
	description: string
	id: number
	published: boolean
	title: string
	updatedAt: string
	authorEmail: string
}

interface NoteCardProps {
	note: {
		body: string
		createdAt: string
		description: string
		id: number
		published: boolean
		title: string
		updatedAt: string
		authorEmail: string
	}
	removeNote(id: number): void
}

const NoteCard = ({ note, removeNote }: NoteCardProps) => {
	const handleRemoveNote = (id: number) => {
		removeNote(id)
	}

	return (
		<Card className={styles['card-container']}>
			<CardBody>
				{note.title && (
					<CardTitle className={styles['title']}>
						<h5>{note.title}</h5>
					</CardTitle>
				)}
				<div className={styles['description']}>{note.description}</div>
			</CardBody>
			<CardFooter className={styles['footer']}>
				<button onClick={() => handleRemoveNote(note.id)}>
					Delete
				</button>
				<button>Edit</button>
			</CardFooter>
		</Card>
	)
}

export default NoteCard
