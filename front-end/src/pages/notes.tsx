import { useAuth0, User } from "@auth0/auth0-react"
import React, { useState, useEffect } from "react"
import { Note } from "../interfaces/notes"
import { notesApi } from "../services/noteService"

const Notes = () => {
	const [notes, setNotes] = useState<Note[]>([])
	const { user } = useAuth0()
	const [newNote, setNewNote] = useState<Note>({
		title: "",
		description: "",
	})

	console.log(user)

	useEffect(() => {
		notesApi.getNotes(user).then(setNotes)
	}, [user])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		notesApi.addNote(newNote, (user as User).sub as string)
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
			<ul>
				{notes.map(note => (
					<li key={note._id}>
						{note.title}
						<br />
						{note.description}
					</li>
				))}
			</ul>
		</div>
	)
}

export { Notes }
