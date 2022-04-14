import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { NoteDto } from "../dto/noteDto"
import { Note } from "../entities/note.entity"
import { User } from "../entities/user.entity"
import * as mongoose from "mongoose"

@Injectable()
export class NoteService {
	constructor(
		@InjectModel("Note")
		private noteModel: Model<Note>,
		@InjectModel("User")
		private userModel: Model<User>
	) {}

	async create(createNoteDto: NoteDto): Promise<void> {
		const note = new this.noteModel(createNoteDto)
		const addNoteToUser = async (result) => {
			await this.userModel
				.findOne({ email: createNoteDto.email })
				.then((user) => {
					if (user) {
						user.notes.push(result._id)
						user.save()
					}
				})
		}
		note && (await note.save().then(addNoteToUser))
		return
	}

	async findNote(id: string): Promise<Note[]> {
		return this.noteModel.find({ id: id }).exec()
	}

	async update(updated: Partial<Note>, id: string) {
		return this.noteModel.updateOne({ _id: id }, updated).exec()
	}

	async remove(id: string, email: any): Promise<any> {
		// deletes note from the notes collection.
		await this.noteModel.deleteOne({ _id: id }).exec()
		// deletes note from the user's notes array.
		await this.userModel.findOne(email).then((user) => {
			if (user) {
				user.notes.pull(id)
				user.save()
			}
		})
	}
}
