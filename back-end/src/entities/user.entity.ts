import mongoose from "mongoose"

export class User {
	_id: string
	connection: string
	client_id: string
	email: string
	password: string
	notes: any
}
