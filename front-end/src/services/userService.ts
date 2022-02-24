import axios from "axios"

class UserService {
	public async signUp(email: string, password: string): Promise<void> {
		await axios
			.post(`http://localhost:3000/users/register`, {
				email,
				password,
			})
			.then(res => {
				if (res.status === 401) {
					alert("E-mail already in use. Please use another e-mail. ")
				}

				if (res.status === 201) {
					alert("Success")
				}
			})
	}

	public async login(email: string, password: string): Promise<any> {
		await axios
			.post(
				`http://localhost:3000/users/login`,
				{
					email,
					password,
				},
				{ withCredentials: true }
			)
			.then(function (response) {})
			.catch(function (err) {})
	}

	public async logout(): Promise<void> {
		await fetch("http://localhost:3000/users/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
	}

	public async getLoggedInUser(): Promise<any> {
		const res = await axios.get(`http://localhost:3000/users/user`, {
			withCredentials: true,
		})

		if (res.status === 401) {
			return console.log("gaybars")
		}

		return res.data
	}

	public async addNoteId(noteId: string, userId: string): Promise<void> {
		await axios.put(`http://localhost:3000/users`, {
			noteId,
			userId,
		})
	}
}

const userService = new UserService()

export { userService }
