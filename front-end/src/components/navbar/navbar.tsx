import { useState } from "react"
import { NavLink } from "react-router-dom"
import { userService } from "../../services/userService"
import useUserStore from "../../stores/store"
import SvgNote from "../icons/Note"
import Login from "../modals/auth/authModal/login"
import SignUp from "../modals/auth/authModal/signup"
import styles from "./navbar.module.scss"

const Navbar = () => {
	const [authModalOpen, setAuthModalOpen] = useState({
		login: false,
		signIn: false,
	})
	const { currentUser, setUser } = useUserStore()

	const handleLogout = () => {
		userService.logout().then(() => setUser(null))
	}

	const handleAuthButtons = (currentUser: string | null) => {
		if (currentUser) {
			return <button onClick={handleLogout}>Logout</button>
		} else {
			return (
				<>
					<button
						onClick={() =>
							setAuthModalOpen({
								...authModalOpen,
								login: true,
								signIn: false,
							})
						}
					>
						LogIn
					</button>
					<button
						onClick={() =>
							setAuthModalOpen({ ...authModalOpen, signIn: true })
						}
					>
						Sign Up
					</button>
				</>
			)
		}
	}

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.links}>
					<NavLink to='notes'>
						<SvgNote size={30} /> Notes
					</NavLink>
				</div>
				<div className={styles.userButtons}>
					{handleAuthButtons(currentUser)}
				</div>
			</nav>
			<SignUp
				setAuthOpen={setAuthModalOpen}
				open={authModalOpen.signIn}
			/>
			<Login setAuthOpen={setAuthModalOpen} open={authModalOpen.login} />
		</>
	)
}

export { Navbar }
