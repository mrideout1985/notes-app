import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "../button/button"

type Props = {}

const Authentication = (props: Props) => {
	const { loginWithRedirect } = useAuth0()
	const { logout } = useAuth0()
	const { isAuthenticated } = useAuth0()

	return isAuthenticated ? (
		<Button
			text='Logout'
			type='button'
			onClick={() => logout({ returnTo: window.location.origin })}
		/>
	) : (
		<Button
			text='Log In'
			type='button'
			onClick={() => loginWithRedirect()}
		/>
	)
}

export { Authentication }
