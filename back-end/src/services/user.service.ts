import { JwtService } from "@nestjs/jwt"
import { UserDto } from "./../dto/userDto"
import {
	BadRequestException,
	Injectable,
	Req,
	UnauthorizedException,
} from "@nestjs/common"
import { Model } from "mongoose"
import { User } from "src/entities/user.entity"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class UserService {
	constructor(
		@InjectModel("User") private userModel: Model<User>,
		private jwtService: JwtService
	) {}

	async registerUser(createUserDto: UserDto): Promise<User> {
		const { email } = createUserDto
		const user = await this.userModel.findOne({ email })
		if (user) {
			throw new BadRequestException(
				"Cannot create user. User already exists"
			)
		}
		const createdUser = new this.userModel(createUserDto)

		await createdUser.save()

		return createdUser
	}

	async loginUser(userDto: Partial<User>): Promise<User> {
		const { email } = userDto
		const user = await this.userModel.findOne({ email })
		if (!user) {
			throw new UnauthorizedException(
				"Unable to login. Please check spelling & try again"
			)
		}
		return this.userModel.findOne(userDto)
	}

	async getLoggedInUser(@Req() request): Promise<any> {
		const cookie = request.cookies["jwt"]
		let data
		if (cookie !== undefined) {
			data = await this.jwtService.verifyAsync(cookie)
		}
		if (!data) {
			throw new UnauthorizedException("Unauthorised, No logged in user")
		}
		const user = await this.userModel
			.findOne({ email: data.email })
			.populate("notes")
			.exec()

		return {
			email: user.email,
		}
	}

	async getUserNotes(@Req() request): Promise<any> {
		const cookie = request.cookies["jwt"]
		let data
		if (cookie !== undefined) {
			data = await this.jwtService.verifyAsync(cookie)
		}
		if (!data) {
			throw new UnauthorizedException("Unauthorised, No logged in user")
		}
		const user = await this.userModel
			.findOne({ email: data.email })
			.populate("notes")
			.exec()

		return {
			notes: user.notes,
		}
	}
}
