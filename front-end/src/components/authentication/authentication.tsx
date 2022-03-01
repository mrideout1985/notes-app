import { NavLink } from "react-router-dom"

import styles from "./authentication.module.scss"
type Props = {
	user: string | null
	handleLogOut: () => void
}

const Authentication = ({ user, handleLogOut }: Props) => {
	return (
		<div className={styles.container}>
			{/* {!user ? (
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
			)} */}
			{user && user ? <NavLink to='/notes'>Notes</NavLink> : null}
			{user && user ? (
				<button onClick={handleLogOut}>Logout</button>
			) : null}
			{!user || user === undefined ? (
				<NavLink to='/login'>Login</NavLink>
			) : null}
		</div>
	)
}

export { Authentication }
