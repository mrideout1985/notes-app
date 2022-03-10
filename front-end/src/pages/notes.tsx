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
		email: user,
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
						TODO : CREATE A BACK END METHOD THAT GETS THE USER. TRY
						AND FIX THE FUCKING STUPID PROTECED ROUTES (FRONT END)
						NOTES.
					</div>
				</>
			) : (
				<Spinner animation='border' role='status' />
			)}
		</div>
	)
}

export { Notes }
