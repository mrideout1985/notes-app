import axios from "axios"
import React, { useEffect, useState } from "react"

function useGetUserNotes<Payload>(url: string): {
	data: Payload | undefined
	done: boolean
} {
	const [data, setData] = useState<Payload>()
	const [done, setDone] = useState(false)

	useEffect(() => {
		axios
			.get(url, {
				withCredentials: true,
			})
			.then(d => {
				setData(d.data)
				setDone(true)
			})
	}, [url])

	return {
		data,
		done,
	}
}

export default useGetUserNotes
