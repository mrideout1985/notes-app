import axios from "axios"
import { useState } from "react"
import useUserStore from "../../stores/store"

const API_URL = "http://localhost:3000/users/auth/"

const useAuth = () => {
	const [loading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error>()
	const { currentUser } = useUserStore()

	const execute = async (
		authEndPoint: string,
		email: string,
		password: string
	) => {
		setIsLoading(true)
		await axios
			.post(
				API_URL + authEndPoint,
				{ email, password },
				{
					withCredentials: true,
				}
			)
			.then(() => {
				setIsLoading(false)
			})
	}

	return {
		execute,
		loading,
		error,
	}
}

export default useAuth
