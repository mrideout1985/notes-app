import axios from "axios"

export const register = (email: string, password: string) => {
	let response = axios
		.post(
			"http://localhost:3000/auth/register",
			{
				email,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.catch(function (error) {
			if (error) {
				return error
			}
		})

	return response
}

export const login = (email: string, password: string) => {
	let response = axios
		.post(
			`http://localhost:3000/auth/login`,
			{
				email,
				password,
			},
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(res => {
			if (res) {
				return res
			}
		})
		.catch(error => {
			if (error) {
				return error
			}
		})

	return response
}

export const logout = () => {
	return axios.post("http://localhost:3000/auth/logout")
}

export const getAndSetLoggedInUser = async (token: string) => {
	let response = axios.get("http://localhost:3000/user/me", {
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
	return response
}
