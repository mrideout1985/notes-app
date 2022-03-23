import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { NewNote } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import Modal from "react-bootstrap/Modal"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"
import { useForm } from "react-hook-form"
import { userService } from "../services/userService"
import { noteformErrors } from "../utils/formErrors"
import SvgPlusCircle from "../components/icons/PlusCircle"
import SvgXCircle from "../components/icons/XCircle"
import SvgCheckCircle from "../components/icons/CheckCircle"
import { NoteCard } from "../components/noteCard/noteCard"

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
	const { user } = useAuth()
	const [submitting, setSubmitting] = useState(false)
	const [show, setShow] = useState(false)
	const [newNote, setNewNote] = useState<NewNote>()
	const [displayedNotes, setDisplayedNotes] = useState<NotesArray[]>()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()
	const onSubmit = (data: any) => {
		setNewNote({ ...data, completed: false, email: user.email })
		setSubmitting(true)
		setShow(false)
	}
	const handleError = (errors: any) => {}

	const removeNote = (noteId: string) => {
		notesApi.removeNote(noteId)
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))
	}

	const handleCompleted = (noteId: string, completed: any) => {
		notesApi.updateNote(noteId, completed)
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))
	}

	useEffect(() => {
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))
		if (submitting === true) {
			notesApi.addNote(newNote)
			setSubmitting(false)
		}
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))
		reset()
	}, [newNote, reset, submitting])

	return (
		<div className={styles.container}>
			<div className={styles.addNoteButtonContainer}>
				<button
					className={styles.addNoteButton}
					onClick={() => setShow(true)}
				>
					<SvgPlusCircle size={25} />
				</button>
			</div>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				backdrop='static'
				keyboard={false}
				className={styles.modal}
				autofocus
				centered
			>
				<form
					className={styles.form}
					onSubmit={handleSubmit(onSubmit, handleError)}
				>
					<div className={styles.inputContainer}>
						<input
							type='text'
							placeholder='title'
							{...register("title", noteformErrors.title)}
						/>
						<div className={styles.errors}>
							{errors?.title && errors.title.message}
						</div>
					</div>
					<div className={styles.inputContainer}>
						<textarea
							placeholder='description'
							{...register(
								"description",
								noteformErrors.description
							)}
						/>
						<div className={styles.errors}>
							{errors?.description && errors.description.message}
						</div>
					</div>
					<div className={styles.buttons}>
						<button type='submit'>
							<SvgCheckCircle />
						</button>
						<button onClick={() => setShow(false)}>
							<SvgXCircle />
						</button>
					</div>
				</form>
			</Modal>

			<div className={styles.notesContainer}>
				{!submitting ? (
					<div className={styles.notes}>
						{displayedNotes &&
							displayedNotes.map((note: any, i: number) => (
								<NoteCard
									title={note.title}
									description={note.description}
									key={i}
									id={note._id}
									removeNote={removeNote}
									complete={note.completed}
									toggleComplete={handleCompleted}
								/>
							))}
					</div>
				) : (
					<div className={styles.spinnerContainer}>
						<Spinner
							animation='border'
							role='status'
							variant='warning'
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export { Notes }
