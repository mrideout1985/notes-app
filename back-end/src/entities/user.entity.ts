import mongoose from "mongoose"

export class User {
	id: number
	email: string
	password: string
	notes: any
}
