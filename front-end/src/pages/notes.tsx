import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { NewNote } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"
import { useForm } from "react-hook-form"
import { userService } from "../services/userService"

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
	const [newNote, setNewNote] = useState<NewNote>()
	const [displayedNotes, setDisplayedNotes] = useState<NotesArray[]>()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()
	const onSubmit = (data: any) => {
		setNewNote({ ...data, email: user.email })
		setSubmitting(true)
	}
	const handleError = (errors: any) => {}

	const formErrors = {
		title: {
			required: "Title is required",
			minLength: {
				value: 5,
				message: "Title must have at least 5 characters",
			},
		},
		description: {
			required: "Description is required",
			minLength: {
				value: 15,
				message: "Description must have at least 25 characters",
			},
		},
	}

	const removeNote = (noteId: string) => {
		notesApi.removeNote(noteId)
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))
	}

	useEffect(() => {
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
			{!submitting ? (
				<>
					<h1>Notes</h1>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit, handleError)}
					>
						<input
							type='text'
							placeholder='title'
							{...register("title", formErrors.title)}
						/>
						{errors?.title && errors.title.message}

						<input
							type='text'
							placeholder='description'
							{...register("description", formErrors.description)}
						/>
						{errors.description && errors.description.message}

						<input type='submit' />
					</form>
					<div className={styles.notes}>
						{displayedNotes &&
							displayedNotes.map((el: any, i: number) => (
								<div key={i} className={styles.note}>
									<div>{el.title}</div>
									<div>{el.description}</div>

									<button onClick={() => removeNote(el._id)}>
										Remove
									</button>
								</div>
							))}
					</div>
				</>
			) : (
				<Spinner animation='border' role='status' />
			)}
		</div>
	)
}

export { Notes }
