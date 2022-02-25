import { Note } from "src/entities/note.entity"

export interface User {
	_id: string
	email: string
	password: string
	notes: Note[]
}
