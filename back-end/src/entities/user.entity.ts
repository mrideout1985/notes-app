import mongoose from "mongoose"

export class User {
	_id: string
	email: string
	password: string
	note: string[]
}
