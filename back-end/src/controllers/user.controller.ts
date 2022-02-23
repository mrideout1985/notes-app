import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Req,
	Put,
	Res,
	Query,
	Delete,
} from "@nestjs/common"
import { UserService } from "src/services/user.service"
import { Response, Request } from "express"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService
	) {}

	@Post("register")
	async register(
		@Body("name") name: string,
		@Body("email") email: string,
		@Body("password") password: string
	) {
		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await this.userService.registerUser({
			email,
			password: hashedPassword,
		})
		delete user.password

		return user
	}

	@Post("login")
	async login(
		@Body("email") email: string,
		@Body("password") password: string,
		@Res({ passthrough: true }) response: Response
	) {
		const user = await this.userService.loginUser({ email })

		if (!user) {
			throw new HttpException(
				"invalid credentials",
				HttpStatus.BAD_REQUEST
			)
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new HttpException(
				"invalid credentials",
				HttpStatus.BAD_REQUEST
			)
		}

		const jwt = await this.jwtService.signAsync({ id: user.id })

		response.cookie("jwt", jwt, { httpOnly: true })

		return {
			message: "success",
		}
	}

	@Delete()
	remove(@Body() noteId) {
		return this.userService.removeUserNote(noteId)
	}

	@Get()
	getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Get()
	getUser(@Body() body) {
		return this.userService.getUser(body)
	}
	@Put()
	addUserNote(@Body() body) {
		return this.userService.addUserNote(body)
	}
}
