import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
	name: String,
	id: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "NOTE",
		},
	],
})
