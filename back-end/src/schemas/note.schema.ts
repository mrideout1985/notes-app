import * as mongoose from "mongoose"
// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
// import { Document } from "mongoose"
// import { User } from "./user.schema"

// export type NoteDocument = Note & Document

// @Schema()
// export class Note {
// 	@Prop()
// 	title: string
// 	@Prop()
// 	description: string
// 	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
// 	Note: User
// }

// export const NoteSchema = SchemaFactory.createForClass(Note)

export const NoteSchema = new mongoose.Schema({
	title: String,
	description: String,
})
