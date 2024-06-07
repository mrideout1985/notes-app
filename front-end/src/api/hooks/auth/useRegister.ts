import axios from 'axios'
import { useState } from 'react'

type AuthData = { email: string; password: string }

const useRegister = (options?: {
	onSuccess?: () => void
	onError?: () => void
}) => {
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
				options?.onSuccess?.()
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

export default useRegister
