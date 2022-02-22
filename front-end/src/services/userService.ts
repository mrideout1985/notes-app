import axios from "axios"

class UserService {
	public async addNoteId(noteId: string, userId: string): Promise<void> {
		await axios.put(`http://localhost:3000/user`, {
			noteId,
			userId,
		})
	}
}

const userService = new UserService()

export { userService }
