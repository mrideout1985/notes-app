import * as mongoose from "mongoose"

export class User {
	_id: string
	email: string
	password: string
	notes: mongoose.Types.ObjectId[]
}
