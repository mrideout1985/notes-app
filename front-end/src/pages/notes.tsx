import React, { useState, useEffect, useContext } from "react"
import { Note } from "../interfaces/notes"
import { notesApi } from "../services/noteService"
import { UserContext } from "../stores/userContext"

const Notes = () => {
	const { user } = useContext(UserContext)
	const [notes, setNotes] = useState<Note[]>([])
	const [newNote, setNewNote] = useState<Note>({
		title: "",
		description: "",
		user: user,
	})

	useEffect(() => {
		// notesApi.getNotes(user).then(setNotes)
		notesApi.getAllUserNotes().then(res => {
			return res
		})
		// userService.getLoggedInUser().then(res => console.log(res))
	}, [user])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		notesApi.addNote(newNote)
	}

	return (
		<div style={{ color: "red" }}>
			<form onSubmit={onSubmit}>
				<label htmlFor='title'>Title</label>
				<input type='text' name='title' onChange={onChange} />
				<label htmlFor='title'>Description</label>
				<input type='text' name='description' onChange={onChange} />
				<input type='submit' name='add note' />
			</form>
		</div>
	)
}

export { Notes }
