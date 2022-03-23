import React from "react"
import { useAuth } from "../../hooks/useAuth"
import { NavLink } from "react-router-dom"
import styles from "./sidenav.module.scss"

type Props = {
	links?: string[]
}

const SideNav = ({ links }: Props) => {
	const { user } = useAuth()
	return (
		<div className={styles.nav}>
			<ul>
				{links &&
					links.map((link, i) => (
						<li key={i}>
							<NavLink to={`/${link}`}>{link}</NavLink>
						</li>
					))}
			</ul>
		</div>
	)
}

export { SideNav }
