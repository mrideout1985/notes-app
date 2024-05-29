import axios from 'axios'
import { useState } from 'react'
import useUserStore from '../../stores/authstore'
import { useNavigate } from 'react-router-dom'

type AuthData = { email: string; password: string }

const useLogin = () => {
	const user = useUserStore()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [responseError, setResponseError] = useState<string | undefined>(
		undefined,
	)

	const execute = async ({ email, password }: AuthData) => {
		setLoading(true)

		try {
			const response = await axios.post(
				'http://localhost:3000/auth/login',
				{ email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				},
			)
			if (response.status === 201) {
				user.setCurrentUser({
					email: response.data.user.email,
					token: response.data.Authorization,
					id: response.data.user.id,
				})
				navigate('/')
			}

			return response
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setResponseError(error.response?.data.message)
			}
		} finally {
			setLoading(false)
		}
	}

	return { ...user, execute, loading, responseError }
}

export default useLogin
