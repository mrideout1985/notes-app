import React from "react"
import { Navbar } from "../navbar/navbar"
import { Sidebar } from "../sidebar/sidebar"
import styles from "./layout.module.scss"

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<Navbar />
			<div className={styles["layout"]}>{children}</div>
		</>
	)
}

export { Layout }
