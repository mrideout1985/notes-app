import { JwtService } from "@nestjs/jwt"
import { UserDto } from "./../dto/userDto"
import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Req,
} from "@nestjs/common"
import { Model } from "mongoose"
import { User } from "src/entities/user.entity"
import { InjectModel } from "@nestjs/mongoose"
import { Note } from "src/entities/note.entity"

@Injectable()
export class UserService {
	constructor(
		@InjectModel("User") private userModel: Model<User>,
		// @InjectModel("Note") private noteModel: Model<Note>,
		private jwtService: JwtService
	) {}

	async registerUser(createUserDto: UserDto): Promise<User> {
		const { email } = createUserDto
		const user = await this.userModel.findOne({ email })
		if (user) {
			throw new HttpException(
				"user already exists",
				HttpStatus.BAD_REQUEST
			)
		}
		const createdUser = new this.userModel(createUserDto)

		await createdUser.save()

		return createdUser
	}

	async loginUser(userDto: Partial<User>): Promise<User> {
		return this.userModel.findOne(userDto)
	}

	async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec()
	}

	async findOne(email): Promise<User> {
		return await this.userModel.findOne(email)
	}

	async getLoggedInUser(@Req() request): Promise<any> {
		const cookie = request.cookies["jwt"]
		let data
		if (cookie !== undefined) {
			data = await this.jwtService.verifyAsync(cookie)
		}
		if (!data) {
			throw new HttpException("Unauthorised", HttpStatus.UNAUTHORIZED)
		}

		const user = await this.userModel.findOne({ email: data["email"] })

		return {
			email: user.email,
		}
	}

	async addUserNote() {}

	// 	userId,
	// 	noteId,
	// }: {
	// 	userId: string
	// 	noteId: string
	// }): Promise<void> {
	// 	let user
	// 	if (noteId) user = await this.userModel.find({ email: userId }).exec()
	// 	user[0].notes = [...user[0].notes, noteId]
	// 	user[0].save()
}
