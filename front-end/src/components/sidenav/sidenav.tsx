import React from "react"
import styles from "./sidenav.module.scss"

type Props = {
	links?: string[]
}

const SideNav = ({ links }: Props) => {
	return <div className={styles.nav}></div>
}

export { SideNav }
