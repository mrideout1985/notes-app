import axios from "axios"
import { Note } from "../interfaces/notes"

class NoteService {
	public async getNotes(user: any): Promise<Note[]> {
		let response
		await axios.get(`http://localhost:3000/notes`).then(res => {
			response = res.data
		})
		return response ?? []
	}

	public async addNote(note: Note): Promise<void> {
		axios.post(`http://localhost:3000/notes`, note)
	}
}

const notesApi = new NoteService()

export { notesApi }
