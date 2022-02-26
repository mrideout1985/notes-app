import React from "react"
import { Sidebar } from "../sidebar/sidebar"
import styles from "./layout.module.scss"

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles["root"]}>
			<Sidebar links={["profile", "notes"]} />
			<div className={styles["layout"]}>{children}</div>
		</div>
	)
}

export { Layout }
