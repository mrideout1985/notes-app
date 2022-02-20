import { User } from "@auth0/auth0-react"
import axios from "axios"
import { Note } from "../interfaces/notes"

class NoteService {
	public async getNotes(user: User | undefined): Promise<Note[]> {
		let response
		await axios.get(`http://localhost:3000/notes`).then(res => {
			response = res.data
		})
		return response ?? []
	}
}

const notesApi = new NoteService()

export { notesApi }
