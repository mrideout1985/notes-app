import { HttpException, HttpStatus, Injectable, Req } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "src/entities/user.entity"
import { UserDto } from "./../dto/userDto"

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
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: "User already exists",
				},
				HttpStatus.INTERNAL_SERVER_ERROR
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
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: "No user found, check your credentials",
				},
				HttpStatus.NOT_FOUND
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
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: "No user found, check your credentials",
				},
				HttpStatus.NOT_FOUND
			)
		}
		const user = await this.userModel
			.findOne({ email: data.email })
			.populate("notes")
			.exec()

		return user.email
	}

	async getUserNotes(@Req() request): Promise<any> {
		const cookie = request.cookies["jwt"]
		let data: User

		if (cookie !== undefined) {
			data = await this.jwtService.verifyAsync(cookie)
		}
		if (!data) {
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: "No user found, check your credentials",
				},
				HttpStatus.NOT_FOUND
			)
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
