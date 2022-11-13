import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

const API_URL = "http://localhost:3000/users/auth/"

const useAuth = (authEndPoint: string, email: string, password: string) => {
	const [loading, setIsLoading] = useState<boolean>(false)
	const [response, setResponse] = useState<AxiosResponse<any, any>>()
	const [error, setError] = useState<Error>()

	useEffect(() => {
		axios
			.post(
				API_URL + authEndPoint,
				{ email, password },
				{
					withCredentials: true,
				}
			)
			.then(res => {
				setIsLoading(true)
				setResponse(res)
			})
			.catch((error: Error) => {
				setError(new Error(error.message))
			})
	}, [authEndPoint, email, password])

	return {
		loading,
		response,
		error,
	}
}

export default useAuth
