import { deleteNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { MouseEventHandler, useState } from 'react'
import {
	Card,
	CardBody,
	CardFooter,
	CardText,
	CardTitle,
	Modal,
	ModalHeader,
} from 'reactstrap'
import NoteCardModal from '../notecard-modal/NoteCardModal'
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
	refetch: { execute: () => Promise<void> }
}

const NoteCard = ({ note, removeNote, refetch }: NoteCardProps) => {
	const [openModal, setOpenModal] = useState(false)

	const handleRemoveNote = (id: number) => {
		removeNote(id)
	}

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
					<button onClick={() => handleRemoveNote(note.id)}>
						Delete
					</button>
					<button onClick={() => setOpenModal(true)}>Edit</button>
				</CardFooter>
			</Card>
			<NoteCardModal
				title={note.title}
				toggle={toggleModal}
				description={note.description}
				open={openModal}
				refetch={refetch}
			/>
		</>
	)
}

export default NoteCard
