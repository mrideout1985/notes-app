import { useContext } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import { AuthContext } from "../../stores/AuthProvider"
import styles from "./Navbar.module.scss"

const Navbar = () => {
	const auth = useContext(AuthContext)

	console.log(auth?.user)

	const handleLogout = () => {
		auth?.logout()
	}

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.button_group}>
					{!auth?.user ? (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register'>Register</Link>
						</>
					) : (
						<Button onClick={handleLogout}>Logout</Button>
					)}
				</div>
			</nav>
		</>
	)
}

export default Navbar
