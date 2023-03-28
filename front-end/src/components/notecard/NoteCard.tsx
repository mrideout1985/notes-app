import { Article } from '@/api/hooks/getUserNotes'
import { useState } from 'react'
import { Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap'
import NoteCardModal from '../notecard-modal/NoteCardModal'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	note: Article
	removeNote: (id: string) => void
	refetch: () => void
}

const NoteCard = ({ note, removeNote, refetch }: NoteCardProps) => {
	const [openModal, setOpenModal] = useState(false)

	const toggleModal = () => setOpenModal(!openModal)

	return (
		<>
			<Card className={styles['card-container']}>
				<CardBody>
					{note.title && (
						<CardTitle className={styles['title']}>
							<h5>{note.title}</h5>
						</CardTitle>
					)}
					<div className={styles['description']}>
						{note.description}
					</div>
				</CardBody>
				<CardFooter className={styles['footer']}>
					<button onClick={() => removeNote(note.id)}>Delete</button>
					<button onClick={() => setOpenModal(true)}>Edit</button>
				</CardFooter>
			</Card>
			<NoteCardModal
				title={note.title}
				toggle={toggleModal}
				description={note.description}
				open={openModal}
				refetch={refetch}
				id={note.id}
				handleOnClose={() => setOpenModal(false)}
				handleOnSubmit={(e) => {
					e.preventDefault()
				}}
			/>
		</>
	)
}

export default NoteCard
