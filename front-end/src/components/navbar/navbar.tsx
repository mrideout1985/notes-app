import { useState } from "react"
import { LoginModal } from "../modal/loginModal"
import { SignUpModal } from "../modal/signUpModal"
import styles from "./navbar.module.scss"

const Navbar = () => {
	const [toggleLogin, setToggleLogin] = useState<boolean>(false)
	const [toggleSignUp, setToggleSignUp] = useState<boolean>(false)

	return (
		<nav className={styles.navbar}>
			<div className={styles.buttons}>
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
