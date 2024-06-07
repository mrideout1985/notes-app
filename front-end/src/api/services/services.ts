import axios from 'axios'

export const createNote = async (
	data: { title: string; description: string },
	token: any,
	email: string | undefined,
) => {
	const response = await axios.post(
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
				authorization: 'Bearer ' + token,
			},
		},
	)

	return response
}

export const updateNote = async (
	data: { title: string; description: string },
	token: string | undefined,
	email: string | undefined,
	id: string,
) => {
	try {
		const response = await axios.patch(
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
					authorization: 'Bearer ' + token,
				},
			},
		)
		return response
	} catch (error) {
		console.log(error)
	}
}

export const deleteNote = async (id: string, token: string | undefined) => {
	const response = axios.delete(`http://localhost:3000/articles/${id}`, {
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			authorization: 'Bearer ' + token,
		},
	})
	return await response
}
