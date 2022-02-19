import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../button/button"
import { Title } from "../title/title"
import styles from "./sidebar.module.scss"

type SidebarProps = {
	links?: string[]
}

const Sidebar = ({ links }: SidebarProps) => {
	const user = "DAVID KELSHAW" //FAKE USER
	const handleLinks = (link: string) => {
		if (link !== "profile" && user === undefined) {
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
					to={`${link === "dashboard" ? "/" : link}`}
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
					<Button type='button' text='new note' />
				</div>
			</div>
		</nav>
	)
}

export { Sidebar }
