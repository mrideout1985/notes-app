/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { Authentication } from "../authentication/authentication"
import { useContext, useEffect } from "react"
import { userService } from "../../services/userService"
import { UserContext } from "../../stores/userContext"
import styles from "./navbar.module.scss"

type NavProps = {}

const Navbar = () => {
	const { user, setUser } = useContext(UserContext)
	const handleUserLogin = () => {
		userService.getLoggedInUser().then(data => {
			setUser(data.email)
		})
	}
	useEffect(() => {
		if (user && user) {
		} else {
			handleUserLogin()
		}
	}, [handleUserLogin, user])
	const handleLogOut = () => {
		userService.logout()
		setUser(null)
	}
	return (
		<nav className={styles.navbar}>
			<div className={styles.authentication}>
				<Authentication handleLogOut={handleLogOut} user={user} />
			</div>
		</nav>
	)
}
export { Navbar }
