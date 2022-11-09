import { useEffect, useState } from "react"

type User = {
	email: string
	password: string
}

function useAuth<Payload>(url: string, credentials: Payload) {
	const [user, setUser] = useState<User>()

	useEffect(() => {
		axios
	})

	return {
		user,
	}
}

export default useAuth
