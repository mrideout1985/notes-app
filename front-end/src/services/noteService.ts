import axios from "axios"

class NoteService {
	public async addNote(note: string): Promise<void> {
		await axios.post(`http://localhost:3000/notes`, note)
	}

	public async updateNote(id: string, update: boolean): Promise<void> {
		await axios.patch(`http://localhost:3000/notes/${id}`, update)
	}

	public async removeNote(id: string, email: string): Promise<void> {
		await axios.delete(`http://localhost:3000/notes/${id}`, { data: email })
	}
}

const notesApi = new NoteService()

export { notesApi }
