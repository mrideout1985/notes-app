import axios from 'axios'

export const register = async (email: string, password: string) => {
	const response = axios
		.post(
			'http://localhost:3000/auth/register',
			{
				email,
				password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.catch(function (error) {
			if (error) {
				return error
			}
		})

	return await response
}

export const login = async (email: string, password: string) => {
	const response = axios
		.post(
			`http://localhost:3000/auth/login`,
			{
				email,
				password,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.then((res) => {
			if (res) {
				return res
			}
		})
		.catch((error) => {
			if (error) {
				return error
			}
		})

	return await response
}

export const logout = async () => {
	sessionStorage.clear()
	localStorage.clear()
	return await fetch('http://localhost:3000/auth/logout', {
		method: 'POST',
		credentials: 'include',
	})
}

export const getUserNotes = async (token: string | null) => {
	const response = axios.get('http://localhost:3000/articles/my-articles', {
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
	return await response
}

export const createNote = async (
	data: { title: string; description: string },
	token: any,
	email: string | undefined,
) => {
	const response = axios.post(
		'http://localhost:3000/articles',
		{
			title: data.title,
			description: data.description,
			authorEmail: email,
		},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		},
	)

	return await response
}

<<<<<<< HEAD
<<<<<<< Updated upstream
export const updateArticle = async (
	data: FormValues,
	token: any,
	email: string | undefined,
	id: string,
) => {
	const response = axios.patch(
		'http://localhost:3000/articles',
		{
			title: data.title,
			description: data.description,
			authorEmail: email,
		},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		},
	)
=======
<<<<<<< Updated upstream
export const deleteArticle = async (id: number, token: string | undefined) => {
=======
export const updateNote = async (
	data: { title: string; description: string },
	token: string | undefined,
	email: string | undefined,
	id: number | undefined,
) => {
	const response = axios
		.patch(
			`http://localhost:3000/articles/${id}`,
			{
				title: data.title,
				description: data.description,
				authorEmail: email,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			},
		)
		.catch(function (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message)
			}
			console.log(error.config)
		})
>>>>>>> Stashed changes

	return response
}

export const deleteNote = async (id: number) => {
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
=======
export const deleteArticle = async (id: number, token: string | undefined) => {
>>>>>>> main
	const response = axios.delete(`http://localhost:3000/articles/${id}`, {
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
	return await response
}
