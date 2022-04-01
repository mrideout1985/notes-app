import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { NoteDto } from "../dto/noteDto"
import { Note } from "../entities/note.entity"
import { User } from "../entities/user.entity"

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
		const addNoteToUser = (result) => {
			this.userModel
				.findOne({ email: createNoteDto.email })
				.then((user) => {
					user && user.notes.push(result._id)
					user && user.save()
				})
		}

		note && note.save().then(addNoteToUser)
	}

	async findNote(id: string): Promise<Note[]> {
		return this.noteModel.find({ id: id }).exec()
	}

	async update(updated: Partial<Note>, id: string) {
		return this.noteModel.updateOne({ _id: id }, updated).exec()
	}

	async remove(id: string) {
		return this.noteModel.deleteOne({ _id: id }).exec()
	}
}
