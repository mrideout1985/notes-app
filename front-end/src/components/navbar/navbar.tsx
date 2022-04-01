import { useState } from "react"
import { NavLink } from "react-router-dom"
import { GridOutline } from "../icons"
import SvgNote from "../icons/Note"
import { LoginModal } from "../modal/loginModal"
import { SignUpModal } from "../modal/signUpModal"
import styles from "./navbar.module.scss"

const Navbar = () => {
	const [toggleLogin, setToggleLogin] = useState<boolean>(false)
	const [toggleSignUp, setToggleSignUp] = useState<boolean>(false)

	return (
		<nav className={styles.navbar}>
			<div className={styles.links}>
				<NavLink to='dashboard'>
					<GridOutline size={30} /> Dashboard
				</NavLink>
				<NavLink to='notes'>
					<SvgNote size={30} /> Notes
				</NavLink>
			</div>
			<div className={styles.userButtons}>
				<LoginModal
					setToggleLogin={setToggleLogin}
					toggleLogin={toggleLogin}
					toggleSignUp={toggleSignUp}
					setToggleSignUp={setToggleSignUp}
				/>
				<SignUpModal
					setToggleLogin={setToggleLogin}
					toggleLogin={toggleLogin}
					toggleSignUp={toggleSignUp}
					setToggleSignUp={setToggleSignUp}
				/>
			</div>
		</nav>
	)
}

export { Navbar }
