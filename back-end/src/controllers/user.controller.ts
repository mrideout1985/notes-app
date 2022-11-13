import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Req,
	Res,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { Request, Response } from "express"
import { UserService } from "../services/user.service"

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	@Post("auth/register")
	async register(
		@Body("email") email: string,
		@Body("password") password: string
	) {
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = await this.userService.registerUser({
			email,
			password: hashedPassword,
		})

		delete user[password]
		return user
	}

	@Post("auth/login")
	async login(
		@Body("email") email: string,
		@Body("password") password: string,
		@Res({ passthrough: true }) response: Response
	) {
		const user = await this.userService.loginUser({ email })
		const jwt = await this.jwtService.signAsync({ email: email })

		response.cookie("jwt", jwt, {
			httpOnly: true,
		})

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new HttpException(
				"invalid credentials",
				HttpStatus.BAD_REQUEST
			)
		}

		return {
			message: "Successfully Logged In",
			user,
		}
	}

	@Get("user")
	async user(@Req() request: Request) {
		return this.userService.getLoggedInUser(request)
	}

	@Get("notes")
	async userNotes(@Req() request: Request) {
		return this.userService.getUserNotes(request)
	}

	@Post("auth/logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("jwt")
		return {
			message: "successfull log out",
		}
	}
}
