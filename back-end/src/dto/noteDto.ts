import * as mongoose from "mongoose"

export interface NoteDto {
	title: string
	description: string
	email: mongoose.Schema.Types.ObjectId
}
