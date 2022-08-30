import { ObjectId, Types } from "mongoose"

export class User {
	_id: string
	email: string
	password: string
	notes: Types.ObjectId[] | any
}
