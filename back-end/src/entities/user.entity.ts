import mongoose from "mongoose"

export class User {
	id: string
	email: string
	password: string
	notes: any
}
