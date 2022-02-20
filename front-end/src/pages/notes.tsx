import { useAuth0 } from "@auth0/auth0-react"

import React, { useState, useEffect } from "react"
import { Note } from "../interfaces/notes"
import { notesApi } from "../services/noteService"

const Notes = () => {
	const [notes, setNotes] = useState<Note[]>([])
	const { user } = useAuth0()

	useEffect(() => {
		notesApi.getNotes(user).then(setNotes)
	}, [user])

	// new note -> note id -> user in db

	console.log(user)

	return <div style={{ color: "red" }}>{notes[0]?.title}</div>
}

export { Notes }
