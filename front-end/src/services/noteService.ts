import axios from "axios"

class NoteService {
	public async addNote(note: any): Promise<any> {
		await axios.post(`http://localhost:3000/notes`, note)
	}

	public async updateNote(id: string, update: any): Promise<any> {
		await axios.patch(`http://localhost:3000/notes/${id}`, update)
	}

	public async removeNote(id: string, email: any): Promise<any> {
		await axios.delete(`http://localhost:3000/notes/${id}`, email)
	}
}

const notesApi = new NoteService()

export { notesApi }
