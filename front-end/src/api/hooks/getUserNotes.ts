import axios from "axios"
import { useEffect, useState } from "react"

function useGetUser<Payload>(email: string | null): {
	data: Payload | undefined
	done: boolean
} {
	const [data, setData] = useState<Payload>()
	const [done, setDone] = useState(false)

	useEffect(() => {
		axios
			.get(`http://localhost:3000/articles/user/${email}`, {
				withCredentials: true,
			})
			.then(res => {
				if (!data) {
					setDone(false)
				} else {
					setData(res.data)
					setDone(true)
				}
			})
	})

	return {
		data,
		done,
	}
}

export default useGetUser
