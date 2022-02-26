import { User } from "@auth0/auth0-react"
import axios from "axios"
import { Note } from "../interfaces/notes"
import { userService } from "./userService"

class NoteService {
	public async getNotes(user: User | undefined): Promise<Note[]> {
		let response
		await axios.get(`http://localhost:3000/notes`).then(res => {
			response = res.data
		})
		return response ?? []
	}

	// public async addNote(note: Note, userId: string): Promise<void> {
	// 	note.userId = userId
	// 	await axios.post(`http://localhost:3000/notes`, note).then(res => {
	// 		if (res.status === 201) {
	// 			userService.addNoteId(
	// 				res.data._id,
	// 				userId.replace("auth0|", "")
	// 			)
	// 		}
	// 	})
	// }

	public async addNote(note: Note, author: any): Promise<void> {
		author = userService.getLoggedInUser().then(res => {
			axios.post(`http://localhost:3000/notes`, note, res.id)
		})
	}
}

const notesApi = new NoteService()

export { notesApi }
