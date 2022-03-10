import React from "react"
import { Navbar } from "../navbar/navbar"
import styles from "./layout.module.scss"

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles["layout"]}>
			<div className={styles["top-nav"]}>
				<Navbar />
			</div>
			<div className={styles.main}>
				<div className={styles["content"]}>{children}</div>
			</div>
		</div>
	)
}

export { Layout }
