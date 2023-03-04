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

<<<<<<< Updated upstream
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
=======
<<<<<<< Updated upstream
const NoteCard = ({ data, removeNote }: NoteCardProps) => {
	return (
		<Card className={styles['card-container']}>
			<CardBody>
				{data.title && (
					<CardTitle className={styles['title']}>
						<h5>{data.title}</h5>
					</CardTitle>
				)}
				<div className={styles['description']}>{data.description}</div>
			</CardBody>
			<CardFooter className={styles['footer']}>
				<button onClick={() => removeNote(data.id)}>Delete</button>
			</CardFooter>
		</Card>
=======
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

	const toggleModal = () => setOpenModal(!openModal)

	return (
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
					<button onClick={() => handleRemoveNote(note.id)}>
						Delete
					</button>
=======
					<button onClick={() => removeNote(note.id)}>Delete</button>
>>>>>>> Stashed changes
					<button onClick={() => setOpenModal(true)}>Edit</button>
				</CardFooter>
			</Card>
			<NoteCardModal
				title={note.title}
				toggle={toggleModal}
				description={note.description}
				open={openModal}
				refetch={refetch}
<<<<<<< Updated upstream
			/>
		</>
=======
				id={note.id}
				handleOnClose={() => setOpenModal(false)}
				handleOnSubmit={(e) => {
					e.preventDefault()
					console.log(e)
				}}
			/>
		</>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
	)
}

export default NoteCard
