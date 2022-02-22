import * as mongoose from "mongoose"

interface Note {
	title: string
	description: string
}

export interface NoteDto extends Note {
	_id: string
	__v: number
}

export const NoteSchema = new mongoose.Schema<Note>({
	title: String,
	description: String,
})
