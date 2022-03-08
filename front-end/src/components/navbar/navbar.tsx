import Button from "react-bootstrap/esm/Button"
import { useAuth } from "../../hooks/useAuth"

const Navbar = () => {
	const { user, userLogout } = useAuth()
	console.log(user)
	return (
		<nav
			style={{
				width: "100%",
				height: "5rem",
				background: "red",
				color: "white",
			}}
		>
			{user ? (
				<Button onClick={() => userLogout()}>Logout</Button>
			) : (
				"login"
			)}
		</nav>
	)
}

export { Navbar }
