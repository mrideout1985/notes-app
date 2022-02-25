import { NoteService } from "../services/notes.service"
import { UserService } from "src/services/user.service"
import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Patch,
	Delete,
} from "@nestjs/common"
@Controller("notes")
export class NotesController {
	constructor(private readonly noteService: NoteService) {}
	@Get()
	findAll() {
		return this.noteService.findAll()
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.noteService.findNote(id)
	}

	@Post()
	create(@Body() body, author: any) {
		return this.noteService.create(body, author)
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() body) {
		return this.noteService.update(body, id)
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.noteService.remove(id)
	}
}
