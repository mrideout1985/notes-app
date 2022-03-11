import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { NewNote } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"
import { userService } from "../services/userService"

interface DisplayNotes {
	title: string
	description: string
	_id?: string
	__v?: number
}

const Notes = () => {
	const { user } = useAuth()
	const [submitting, setSubmitting] = useState(false)
	const [displaySavedNotes, setDisplaySavedNotes] = useState<
		DisplayNotes[] | null
	>(null)
	const [newNote, setNewNote] = useState<NewNote>({
		email: user.email,
		title: "",
		description: "",
	})

	useEffect(() => {}, [submitting, user])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setNewNote({
			...newNote,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSubmitting(true)
	}

	return (
		<div className={styles.container}>
			{!submitting ? (
				<>
					<h1>Notes</h1>
					<form onSubmit={onSubmit} className={styles.form}>
						<label htmlFor='title'>Title</label>
						<input type='text' name='title' onChange={onChange} />
						<label htmlFor='title'>Description</label>
						<input
							type='text'
							name='description'
							onChange={onChange}
						/>
						<input type='submit' name='add note' />
					</form>
					<div className={styles.notes}></div>
				</>
			) : (
				<Spinner animation='border' role='status' />
			)}
		</div>
	)
}

export { Notes }
