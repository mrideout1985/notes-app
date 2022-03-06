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
import { UserService } from "src/services/user.service"
import { Response, Request } from "express"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

@Controller("users")
export class UserController {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	@Post("register")
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

		const jwt = await this.jwtService.signAsync({ email: email })

		response.cookie("jwt", jwt, {
			httpOnly: true,
		})

		return {
			message: "success",
		}
	}

	@Get("user")
	async user(@Req() request: Request) {
		return this.userService.getLoggedInUser(request)
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("jwt")
		return {
			message: "successfull log out",
		}
	}

	@Get()
	getAllUsers() {
		return this.userService.getAllUsers()
	}
}
