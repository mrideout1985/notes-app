import axios from "axios"
import { useNavigate } from "react-router-dom"

export const api = {
	userRegister: async (email: string, password: string) => {
		const res = axios.post(`http://localhost:3000/users/register`, {
			email,
			password,
		})
		return res
	},
}
