import { Controller, Get, Body, Put } from "@nestjs/common"
import { UserService } from "src/services/user.service"
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get()
	getUser(@Body() body) {
		return this.userService.getUser(body)
	}

	@Put()
	addUserNote(@Body() body) {
		return this.userService.addUserNote(body)
	}
}
