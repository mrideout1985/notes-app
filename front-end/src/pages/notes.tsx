import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Note } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import Spinner from "react-bootstrap/Spinner"
import styles from "../styles/pagestyles/notes.module.scss"

const Notes = () => {
	const { user } = useAuth()
	const [submitting, setSubmitting] = useState(false)
	const [newNote, setNewNote] = useState<Note>({
		email: user.email,
		title: "",
		description: "",
	})

	useEffect(() => {
		if (submitting === true) {
			notesApi.addNote(newNote)
		}
		setSubmitting(false)
	}, [newNote, submitting, user])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
					<div className={styles.notes}>
						{user &&
							user.notes?.map((note: any, i: string) => (
								<div key={i}>
									<h4>{note.title}</h4>
									<p>{note.description}</p>
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
