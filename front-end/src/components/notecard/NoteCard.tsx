import { Article } from '@/api/hooks/getUserNotes'
import { useState } from 'react'
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { Edit, Trash } from '../icons'
import NoteCardModal from '../notecard-modal/NoteCardModal'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	note: Article
	removeNote: (id: string) => void
	refetch: () => void
}

const NoteCard = ({ note, removeNote, refetch }: NoteCardProps) => {
	const [openModal, setOpenModal] = useState(false)

	const determineCardSize = () => {
		const description = note.description
		if (description.length < 150) {
			return 'small'
		}
		if (description.length > 150 && description.length < 250) {
			return 'medium'
		}
		if (description.length > 250) {
			return 'large'
		}
		return 'medium'
	}

	const toggleModal = () => setOpenModal(!openModal)

	return (
		<>
			<Card
				className={`${styles['note-card']} ${
					styles[determineCardSize()]
				}`}
				id={`note-card-${note.id}`}
			>
				<CardBody className={styles['card-body']}>
					{note.title && (
						<CardTitle key={note.id} className={styles['title']}>
							<h5>{note.title}</h5>
						</CardTitle>
					)}
					<CardText className={styles['description']}>
						{note.description}
					</CardText>
				</CardBody>
				<div className={styles['footer']}>
					<Button onClick={() => removeNote(note.id)}>
						<Trash />
					</Button>
					<Button onClick={() => setOpenModal(true)}>
						<Edit />
					</Button>
				</div>
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
