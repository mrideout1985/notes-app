import { CreateUserDto } from "./../../dist/dto/createUser.dto.d"
import { UserDto } from "./../dto/userDto"
import { UserSchema } from "src/schemas/user.schema"
import {
	Body,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
} from "@nestjs/common"
import { Model } from "mongoose"
import { User } from "src/entities/user.entity"
import mongoose, { ObjectId } from "mongoose"
import { Console } from "console"

@Injectable()
export class UserService {
	constructor(
		@Inject("USER")
		public userModel: Model<User>
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

	async getUser({ id }: { id: ObjectId }): Promise<unknown> {
		return this.userModel.find({ _id: id }).exec()
	}

	async addUserNote({
		userId,
		noteId,
	}: {
		userId: string
		noteId: string
	}): Promise<void> {
		let user
		if (noteId) user = await this.userModel.find({ _id: userId }).exec()

		user[0].notes = [...user[0].notes, noteId]

		user[0].save()
	}
}
