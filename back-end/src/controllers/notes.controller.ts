import { UserService } from "src/services/user.service"
import { NoteService } from "../services/notes.service"
import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Patch,
	Delete,
	Req,
} from "@nestjs/common"
@Controller("notes")
export class NotesController {
	constructor(private readonly noteService: NoteService) {}
	@Post()
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
	remove(@Param("id") id: string) {
		return this.noteService.remove(id)
	}
}
