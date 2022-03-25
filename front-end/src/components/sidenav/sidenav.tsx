import React from "react"
import { useAuth } from "../../hooks/useAuth"
import { NavLink } from "react-router-dom"
import styles from "./sidenav.module.scss"
import { FeedPerson, Note } from "../icons"
import SvgFeedPerson from "../icons/FeedPerson"

type Props = {
	links?: string[]
}

const SideNav = ({ links }: Props) => {
	const { user } = useAuth()
	return (
		<div className={styles.nav}>
			<ul className={styles.list}>
				{links &&
					links.map((link, i) => (
						<li key={i} className={styles.listItems}>
							{link === "profile" ? (
								<SvgFeedPerson size={50} />
							) : (
								<Note />
							)}{" "}
							<NavLink to={`/${link}`}>{link}</NavLink>
						</li>
					))}
			</ul>
		</div>
	)
}

export { SideNav }
