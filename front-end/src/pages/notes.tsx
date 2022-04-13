import React, { useEffect, useState } from "react"
import { notesApi } from "../services/noteService"
import { userService } from "../services/userService"
import { NoteCard } from "../components/noteCard/noteCard"
import { AddNoteModal } from "../components/modals/notes/addNoteModal/addNoteModal"
import SvgPlusCircle from "../components/icons/PlusCircle"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"

export interface DisplayNotes {
	title: string
	description: string
	_id?: string
	__v?: number
}

interface NotesArray {
	notes: DisplayNotes[]
}

const Notes = () => {
	const [submitting, setSubmitting] = useState(false)
	const [displayedNotes, setDisplayedNotes] = useState<NotesArray[]>()
	const [showModal, setShowModal] = useState(false)

	const fetchNotes = () =>
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))

	useEffect(() => {
		fetchNotes()
	}, [submitting])

	const removeNote = (noteId: string) => {
		notesApi.removeNote(noteId)
		fetchNotes()
	}

	const handleCompleted = (noteId: string, completed: any) => {
		notesApi.updateNote(noteId, completed)
		fetchNotes()
	}

	return (
		<div className={styles.container}>
			<div className={styles.addNoteButtonContainer}>
				<button
					className={styles.addNoteButton}
					onClick={() => setShowModal(true)}
				>
					<SvgPlusCircle size={35} />
				</button>
			</div>
			<AddNoteModal
				fetchNotes={fetchNotes}
				show={showModal}
				setSubmitting={setSubmitting}
				setShow={setShowModal}
			/>
			{submitting ? (
				<div className={styles.spinnerContainer}>
					<Spinner
						animation='border'
						role='status'
						variant='warning'
					/>
				</div>
			) : (
				<div className={styles.notes}>
					{displayedNotes?.map((note: any, index: number) => (
						<NoteCard
							title={note.title}
							description={note.description}
							key={index}
							id={note._id}
							removeNote={removeNote}
							complete={note.completed}
							toggleComplete={handleCompleted}
							setSubmitting={setSubmitting}
							submitting={submitting}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export { Notes }
