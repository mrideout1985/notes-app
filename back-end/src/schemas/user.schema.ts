import * as mongoose from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User {
	@Prop()
	id: string
	@Prop()
	email: string
	@Prop()
	password: string
	@Prop()
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId
			ref: "NOTE"
		}
	]
}

export const UserSchema = SchemaFactory.createForClass(User)
// import * as mongoose from "mongoose"

// export const UserSchema = new mongoose.Schema({
// 	id: String,
// 	email: String,
// 	password: String,
// 	notes: [
// 		{
// type: mongoose.Schema.Types.ObjectId,
// ref: "NOTE",
// 		},
// 	],
// })
