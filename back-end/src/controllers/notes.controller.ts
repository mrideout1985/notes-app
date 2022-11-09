import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common"
import { NoteService } from "../services/notes.service"
@Controller("notes")
export class NotesController {
	constructor(private readonly noteService: NoteService) {}
	@Post("create")
	create(@Body() body) {
		return this.noteService.create(body)
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.noteService.findNote(id)
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() body) {
		return this.noteService.update(body, id)
	}

	@Delete(":id")
	remove(@Param("id") id: string, @Body() body) {
		return this.noteService.remove(id, body)
	}
}
