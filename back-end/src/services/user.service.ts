import { UserSchema } from "src/schemas/user.schema"
import { Inject, Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { User } from "src/entities/user.entity"
import mongoose, { ObjectId } from "mongoose"

@Injectable()
export class UserService {
	constructor(
		@Inject("USER")
		public userModel: Model<User>
	) {}

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
