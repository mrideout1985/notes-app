import axios from "axios"
import { Note } from "../interfaces/notes"

class NoteService {
	public async getNotes(): Promise<Note[]> {
		let response
		await axios.get(`http://localhost:3000/notes`).then(res => {
			response = res.data
		})
		return response ?? []
	}
}

const notesApi = new NoteService()

export { notesApi }
