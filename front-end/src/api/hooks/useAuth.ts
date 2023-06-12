import axios from 'axios'
import { useState } from 'react'

type Action = 'login' | 'register'
type AuthData = { email: string; password: string }

const useAuth = (action: Action) => {
	const [loading, setLoading] = useState(false)

	const execute = async ({ email, password }: AuthData) => {
		setLoading(true)
		const url = `http://localhost:3000/auth/${action}`

		try {
			const response = await axios.post(
				url,
				{ email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				},
			)
			return response
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.response
			}
		} finally {
			setLoading(false)
		}
	}

	return { execute, loading }
}

export default useAuth
