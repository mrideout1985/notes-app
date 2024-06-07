import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import useUserStore from '../../../stores/authstore'

type AuthData = { email: string; password: string }

interface LoginResponse {
	authorization: string
	user: {
		id: string
		email: string
	}
}

const useLogin = (options?: {
	onSuccess?: () => void
	onError?: () => void
}) => {
	const [loading, setLoading] = useState(false)
	const [responseError, setResponseError] = useState<string | undefined>(
		undefined,
	)

	const user = useUserStore()

	const execute = async ({ email, password }: AuthData) => {
		setLoading(true)
		try {
			const response: AxiosResponse<LoginResponse> = await axios.post(
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
				options?.onSuccess?.()
				user.setCurrentUser({
					email: response.data.user.email,
					token: response.data.authorization,
					id: response.data.user.id,
				})
			}

			return response
		} catch (error) {
			if (axios.isAxiosError(error)) {
				options?.onError?.()
				setResponseError(error.response?.data.message)
			}
		} finally {
			setLoading(false)
		}
	}

	return { execute, loading, responseError }
}

export default useLogin
