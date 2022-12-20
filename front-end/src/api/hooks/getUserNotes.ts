import axios from "axios"
import { useEffect, useState } from "react"

function useGetUserNotes<Payload>(email: string | null | undefined): {
	data: Payload | undefined
	done: boolean
	error: string | undefined
} {
	const [data, setData] = useState<Payload>()
	const [done, setDone] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (email !== null && email !== undefined) {
			axios
				.get<Payload>(`http://localhost:3000/articles/user/${email}`)
				.then(res => {
					if (!data) {
						setDone(false)
					} else {
						setData(res.data)
						setDone(true)
					}
				})
		}

		return () => {
			setDone(true)
			setError("You should not be here user is not logged in")
		}
	}, [data, email])

	return {
		data,
		done,
		error,
	}
}

export default useGetUserNotes
