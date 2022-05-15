import { Navigate } from "react-router-dom"

interface Auth {
	children: any
	user: { user: string }
}

const RequireAuth = ({ user, children }: Auth) => {
	if (user === null) {
		return <Navigate to='/unauthorized' />
	}
	return children
}

export { RequireAuth }
