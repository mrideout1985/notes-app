import { useState } from "react"
import { NavLink } from "react-router-dom"
import useUserStore from "../../stores/store"
import SvgNote from "../icons/Note"
import AuthModal from "../modals/auth/authModal/authModal"
import styles from "./navbar.module.scss"

const Navbar = () => {
	const userActions = useUserStore()
	const [authModalOpen, setAuthModalOpen] = useState(false)

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.links}>
					<NavLink to='notes'>
						<SvgNote size={30} /> Notes
					</NavLink>
				</div>
				<div className={styles.userButtons}>
					<button onClick={() => userActions.logOut()}>Logout</button>
					<button onClick={() => setAuthModalOpen(true)}>
						LogIn
					</button>
					<button onClick={() => setAuthModalOpen(true)}>
						Sign Up
					</button>
				</div>
			</nav>
			<AuthModal
				onSubmit={() => console.log("onsubmit")}
				open={authModalOpen}
			/>
		</>
	)
}

export { Navbar }
