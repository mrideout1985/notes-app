import * as mongoose from "mongoose"

export class NoteDto {
	title: string
	description: string
	completed: boolean
	email: mongoose.Schema.Types.ObjectId
}
