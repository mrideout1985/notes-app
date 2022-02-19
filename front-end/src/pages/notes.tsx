import React, { useState, useEffect } from "react"
import { Note } from "../interfaces/notes"
import { notesApi } from "../services/noteService"

const Notes = () => {
	const [notes, setNotes] = useState<Note[]>([])

	useEffect(() => {
		notesApi.getNotes().then(setNotes)
	}, [notes])

	return <div style={{ color: "red" }}>{notes[0]?.title}</div>
}

export { Notes }
