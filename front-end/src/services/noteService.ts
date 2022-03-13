import axios from "axios"
import { NewNote } from "../interfaces/notes"
import { userService } from "./userService"

class NoteService {
	public async getNotes(user: any): Promise<NewNote[]> {
		let response
		await axios.get(`http://localhost:3000/notes`).then(res => {
			response = res.data
		})
		return response ?? []
	}

	public async getAllUserNotes(): Promise<any> {
		let user = await userService.getLoggedInUser()
		axios
			.get(`http://localhost:3000/notes/`, user.email)
			.then(res => console.log(res.data))
	}

	public async addNote(note: NewNote): Promise<any> {
		await axios.post(`http://localhost:3000/notes`, note)
	}

	public async removeNote(id: string): Promise<any> {
		await axios.delete(`http://localhost:3000/notes/${id}`)
	}
}

const notesApi = new NoteService()

export { notesApi }
