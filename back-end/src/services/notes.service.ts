import { Inject, Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { NoteDto } from "src/dto/userDto"
import { User } from "src/schemas/user.schema"
import { Note } from "../entities/note.entity"

@Injectable()
export class NoteService {
	constructor(
		@Inject("NOTE")
		private noteModel: Model<Note>
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
