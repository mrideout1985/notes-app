import { NoteService } from "./notes.service"

import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Patch,
	Delete,
	Query,
} from "@nestjs/common"
@Controller("notes")
export class NotesController {
	constructor(private readonly noteService: NoteService) {}
	@Get()
	findAll(@Query() query) {
		return this.noteService.findAll()
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.noteService.findNote(id)
	}

	@Post()
	@HttpCode(HttpStatus.GONE)
	create(@Body() body) {
		return this.noteService.create(body)
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
