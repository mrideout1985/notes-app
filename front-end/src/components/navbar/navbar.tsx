import React from "react"
import { Authentication } from "../authentication/authentication"
import styles from "./navbar.module.scss"

type NavProps = {}

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.authentication}>
				<Authentication />
			</div>
		</nav>
	)
}
export { Navbar }
