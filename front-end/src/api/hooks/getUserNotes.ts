import { useState } from "react"

function useGetUserNotes<Payload>(url: string): {
	data: Payload | undefined
	done: boolean
} {
	const [data, setData] = useState<Payload>()
	const [done, setDone] = useState(false)

	return {
		data,
		done,
	}
}

export default useGetUserNotes
