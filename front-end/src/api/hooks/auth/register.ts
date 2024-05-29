import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../../stores/authstore'

type AuthData = { email: string; password: string }

const useRegister = () => {
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
				'http://localhost:3000/auth/register',
				{ email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				},
			)
			if (response.status === 201) {
				navigate('/login')
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

export default useRegister
