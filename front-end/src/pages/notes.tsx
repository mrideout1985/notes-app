import { useEffect, useMemo, useState } from "react"
import { notesApi } from "../services/noteService"
import { userService } from "../services/userService"
import { NoteCard, NoteCardProps } from "../components/noteCard/noteCard"
import { AddNoteModal } from "../components/modals/notes/addNoteModal/addNoteModal"
import SvgPlusCircle from "../components/icons/PlusCircle"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"
import useGetUserNotes from "../api/hooks/getUserNotes"
import { UserNotes } from "../interfaces/notes"
import { Note } from "../components/icons"

export interface DisplayNotes {
	title: string
	description: string
	completed: boolean
	_id?: string
	__v?: number
}

interface Notes {
	notes: DisplayNotes[]
}

const Notes = () => {
	const [showModal, setShowModal] = useState(false)
	const { data, done } = useGetUserNotes<Notes>(
		"http://localhost:3000/users/notes"
	)

	const handleNotes = () => {
		if (done) {
			return data?.notes.map((note: DisplayNotes) => (
				<NoteCard
					complete={note.completed}
					description={note.description}
					id=''
					key={note._id}
					submitting={done}
					toggleComplete={handleCompleted}
					title={note.title}
					removeNote={removeNote}
				/>
			))
		} else {
			return <div style={{ background: "red" }}>Loading...</div>
		}
	}

	const removeNote = (noteId: string, email: string) => {
		notesApi.removeNote(noteId, email)
	}

	const handleCompleted = (noteId: string, completed: boolean) => {
		notesApi.updateNote(noteId, completed)
	}

	return (
		<div className={styles.container}>
			<div className={styles.addNoteButtonContainer}>
				<button
					className={styles.addNoteButton}
					onClick={() => setShowModal(true)}
					aria-label='Add Note'
				>
					<SvgPlusCircle size={35} />
				</button>
			</div>
			<div>{handleNotes()}</div>
		</div>
	)
}

export { Notes }
