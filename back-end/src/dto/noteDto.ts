import * as mongoose from "mongoose"

export interface NoteDto {
	title: string
	description: string
	completed: boolean
	email: mongoose.Schema.Types.ObjectId
}
