import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { NewNote } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"
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
	const [updatedNotes, setUpdatedNotes] = useState<NotesArray[] | null>(null)
	const [input, setInput] = useState<NewNote>({
		title: "",
		description: "",
	})
	const [newNote, setNewNote] = useState<NewNote>({
		title: "",
		description: "",
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setNewNote({ ...input, email: user.email })
		setInput({
			title: "",
			description: "",
		})
		setSubmitting(true)
	}

	const removeNote = (noteId: string) => {
		notesApi.removeNote(noteId)
		setSubmitting(true)
	}

	useEffect(() => {
		const getNotes = () => {
			userService
				.getLoggedInUserNotes()
				.then(res => setUpdatedNotes(res.notes))
		}
		getNotes()
		if (submitting) {
			notesApi.addNote(newNote)
			getNotes()
		}
		setSubmitting(false)
	}, [user, newNote, submitting])

	console.log("newNote", newNote)

	return (
		<div className={styles.container}>
			{!submitting ? (
				<>
					<h1>Notes</h1>
					<form onSubmit={onSubmit} className={styles.form}>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='title'
							onChange={onChange}
							value={input.title}
						/>
						<label htmlFor='title'>Description</label>
						<input
							type='text'
							name='description'
							onChange={onChange}
							value={input.description}
						/>
						<input type='submit' name='add note' />
					</form>
					<div className={styles.notes}>
						{updatedNotes &&
							updatedNotes.map((el: any, i: number) => (
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
