import { UserDto } from "./../dto/userDto"
import { User } from "../types/User"
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { Model } from "mongoose"

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

	async findOne(email): Promise<User> {
		return this.userModel.findOne(email)
	}

	// async getUserNotes({
	// 	noteId,
	// 	userId,
	// }: {
	// 	userId: string
	// 	noteId: string
	// }): Promise<void> {
	// 	let user
	// 	if (noteId) user = await this.userModel.find({ email: userId }).exec()
	// 	user.notes.filter((note) => (note === noteId ? note : null))
	// }

	// async addUserNote({
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
	// }

	// async removeUserNote({
	// 	userId,
	// 	noteId,
	// }: {
	// 	userId: string
	// 	noteId: string
	// }): Promise<void> {
	// 	let user
	// 	if (noteId) user = await this.userModel.find({ _id: userId }).exec()
	// 	user[0].notes.filter((note: string) => note !== noteId)
	// 	user[0].save()
	// }
}
