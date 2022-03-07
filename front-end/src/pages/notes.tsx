import React, { useState, useEffect, useContext } from "react"
import { useAuth } from "../hooks/useAuth"
import { Note } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import { userService } from "../services/userService"
import styles from "../styles/pagestyles/notes.module.scss"

const Notes = () => {
	const { user } = useAuth()
	const [notes, setNotes] = useState<Note[]>([])
	const [newNote, setNewNote] = useState<Note>({
		email: user,
		title: "",
		description: "",
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		notesApi.addNote(newNote)
	}

	return (
		<div className={styles.container}>
			<h1>Notes</h1>
			<form onSubmit={onSubmit} className={styles.form}>
				<label htmlFor='title'>Title</label>
				<input type='text' name='title' onChange={onChange} />
				<label htmlFor='title'>Description</label>
				<input type='text' name='description' onChange={onChange} />
				<input type='submit' name='add note' />
			</form>

			<div className={styles.notes}>{JSON.stringify(user)}</div>
		</div>
	)
}

export { Notes }
