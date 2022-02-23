import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
	id: Number,
	email: String,
	password: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "NOTE",
		},
	],
})
