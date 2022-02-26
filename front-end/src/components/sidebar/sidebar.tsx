import { NavLink } from "react-router-dom"
import { Title } from "../title/title"
import styles from "./sidebar.module.scss"
import { userService } from "../../services/userService"
import { UserContext } from "../../stores/userContext"
import { useContext, useEffect } from "react"

type SidebarProps = {
	links?: string[]
}

const Sidebar = ({ links }: SidebarProps) => {
	const { user, setUser } = useContext(UserContext)

	const handleLogOut = () => {
		userService.logout()
		setUser(null)
	}

	useEffect(() => {
		const handleLoggedInUser = () => {
			userService.getLoggedInUser().then(data => {
				setUser(data.email)
			})
		}
		if (user === typeof String) {
			return
		}
		handleLoggedInUser()
	}, [setUser, user])

	const handleLinks = (link: string) => {
		if (link !== "profile" && user === null) {
			return (
				<NavLink
					className={({ isActive }) =>
						isActive ? styles["active"] : styles["nav-link"]
					}
					end
					to={`${link}`}
				>
					{link}
				</NavLink>
			)
		} else if (user) {
			return (
				<NavLink
					className={({ isActive }) =>
						isActive ? styles["active"] : styles["nav-link"]
					}
					end
					to={`${link === "profile" ? "/" : link}`}
				>
					{link}
				</NavLink>
			)
		}
	}

	return (
		<nav className={styles["sidebar"]}>
			<Title title='title' />
			<div className={styles["list-container"]}>
				<ul>
					{links &&
						links.map((link, i) => (
							<li key={i}>{handleLinks(link)}</li>
						))}
				</ul>
				<div className={styles["btn-container"]}>
					{user ? (
						<button onClick={handleLogOut}>logout</button>
					) : (
						<button>
							<NavLink to='/login'>Log in</NavLink>
						</button>
					)}
				</div>
			</div>
		</nav>
	)
}

export { Sidebar }
