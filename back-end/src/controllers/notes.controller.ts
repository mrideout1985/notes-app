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
import { Request } from "express"
@Controller("notes")
export class NotesController {
	constructor(
		private readonly noteService: NoteService,
		private readonly userService: UserService
	) {}
	@Get()
	@Get("user")
	findAllLoggedInUserNotes(@Req() user: Request) {
		return this.userService.getLoggedInUser(user).then((res) => res.notes)
	}

	@Post()
	create(@Body() body, email: string) {
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
