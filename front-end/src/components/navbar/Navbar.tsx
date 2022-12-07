import { Link, useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { logout } from "../../api/services/services"
import { useUserStore } from "../../stores/authstore"
import styles from "./Navbar.module.scss"

const Navbar = () => {
	const navigate = useNavigate()
	const user = useUserStore()

	const handleLogout = () => {
		logout()
		user.setUser(null)
		navigate("/login")
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.button_group}>
				{user.currentUser === null ? (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/register'>Register</Link>
					</>
				) : (
					<Button color='secondary' onClick={handleLogout}>
						Logout
					</Button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
