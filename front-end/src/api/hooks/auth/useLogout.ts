import { useState } from 'react'

const useLogout = () => {
	const [loading, setIsLoading] = useState(false)
	const url = `http://localhost:3000/auth/logout`

	const execute = async () => {
		try {
			setIsLoading(true)
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
			sessionStorage.clear()
			localStorage.clear()
			return response.json()
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { execute, loading }
}

export default useLogout
