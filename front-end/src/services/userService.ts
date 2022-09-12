import axios, { AxiosResponse } from "axios"
import { UserNotes } from "../interfaces/notes"

class UserService {
	public async signUp(email: string, password: string): Promise<AxiosResponse> {
		return await axios.post(`http://localhost:3000/users/register`, {
			email,
			password,

		}, { withCredentials: true }
		).then(res => {
			if (res.status === 201) {
				return res
			}
			if (res.status === 500) {
				return new Error("Error Message")
			}
		}).catch(err => err)
	}

	public async login(email: string, password: string): Promise<AxiosResponse> {
		return await axios
			.post(
				`http://localhost:3000/users/login`,
				{
					email,
					password,
				},
				{ withCredentials: true }
			).then(res => {
				if (res.status === 201) {
					return res.data
				}
				if (res.status === 400) {
					return "error message 123"
				}
			}).catch(err => err)

	}

	public async logout(): Promise<void> {
		await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true })
	}

	public async getLoggedInUser(): Promise<AxiosResponse> {
		const res = await axios.get(`http://localhost:3000/users/user`, {
			withCredentials: true,
		})
		return res.data
	}

	public async getLoggedInUserNotes(): Promise<UserNotes> {
		const res = await axios.get(`http://localhost:3000/users/notes`, {
			withCredentials: true,
		})
		return res.data
	}
}

const userService = new UserService()

export { userService }
