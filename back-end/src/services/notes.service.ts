import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { NoteDto } from "src/dto/noteDto"
import { Note } from "src/entities/note.entity"
import { User } from "src/entities/user.entity"

@Injectable()
export class NoteService {
	constructor(
		@InjectModel("Note")
		private noteModel: Model<Note>,
		@InjectModel("User")
		private userModel: Model<User>
	) {}

	async create(createNoteDto: NoteDto): Promise<any> {
		const createNote = new this.noteModel(createNoteDto)
		createNote.save()
	}

	async findAll(): Promise<Note[]> {
		return this.noteModel.find().exec()
	}

	async findNote(id: string): Promise<Note[]> {
		return this.noteModel.find({ _id: id }).exec()
	}

	async update(updated: Partial<Note>, id: string) {
		return this.noteModel.updateOne({ _id: id }, updated).exec()
	}

	async remove(id: string) {
		return this.noteModel.remove({ _id: id }).exec()
	}
}
