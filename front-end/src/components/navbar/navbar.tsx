import { NavLink } from "react-router-dom"
import useUserStore from "../../stores/store"
import SvgNote from "../icons/Note"
import styles from "./navbar.module.scss"

const Navbar = () => {
	const userActions = useUserStore()
	console.log(userActions.currentUser)

	return (
		<nav className={styles.navbar}>
			<div className={styles.links}>
				<NavLink to='notes'>
					<SvgNote size={30} /> Notes
				</NavLink>
			</div>
			<div className={styles.userButtons}>
				<button onClick={() => userActions.logIn("", "")}>Login</button>
				<button onClick={() => userActions.logOut()}>Logout</button>
			</div>
		</nav>
	)
}

export { Navbar }
