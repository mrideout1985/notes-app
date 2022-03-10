import { useState } from "react"
import Button from "react-bootstrap/esm/Button"
import { useAuth } from "../../hooks/useAuth"
import { LoginModal } from "../modal/loginModal"
import styles from "./navbar.module.scss"

const Navbar = () => {
	const { user } = useAuth()
	return (
		<nav className={styles.navbar}>
			<div className={styles.buttons}>
				<LoginModal />
			</div>
		</nav>
	)
}

export { Navbar }
