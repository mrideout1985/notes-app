import axios, { AxiosResponse } from "axios"
import { UserNotes } from "../interfaces/notes"

class UserService {
	public async signUp(email: string, password: string): Promise<AxiosResponse> {
		const res = await axios.post(`http://localhost:3000/users/register`, {
			email,
			password,
		})
		return res
	}

	public async login(email: string, password: string): Promise<AxiosResponse> {
		const res = await axios
			.post(
				`http://localhost:3000/users/login`,
				{
					email,
					password,
				},
				{ withCredentials: true }
			)
			.then(response => response)
		return res
	}

	public async logout(): Promise<void> {
		await fetch("http://localhost:3000/users/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})
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
