import { Link, useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { logout } from "../../api/services/services"
import styles from "./Navbar.module.scss"

const Navbar = () => {
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		navigate("/login")
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.button_group}>
				{!localStorage.getItem("token") ? (
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
