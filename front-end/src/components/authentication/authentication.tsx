import { useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { userService } from "../../services/userService"
import { UserContext } from "../../stores/userContext"
import styles from "./authentication.module.scss"
type Props = {}

const Authentication = (props: Props) => {
	const { user, setUser } = useContext(UserContext)
	const handleLogOut = () => {
		userService.logout()
		setUser(null)
	}
	useEffect(() => {
		userService.getLoggedInUser().then(data => {
			setUser(data.email)
		})
	}, [setUser, user])

	return (
		<div className={styles.container}>
			{user === null ? (
				<>
					<NavLink
						className={({ isActive }) =>
							isActive ? styles["active"] : styles["nav-link"]
						}
						to='/login'
					>
						login
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? styles["active"] : styles["nav-link"]
						}
						to='/register'
					>
						register
					</NavLink>
				</>
			) : (
				<button onClick={handleLogOut}>Logout</button>
			)}
		</div>
	)
}

export { Authentication }
