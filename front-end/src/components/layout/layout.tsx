import React from "react"
import { Navbar } from "../navbar/navbar"
import { SideNav } from "../sidenav/sidenav"
import styles from "./layout.module.scss"

export interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles["layout"]}>
			<div className={styles["top-nav"]}>
				<Navbar />
			</div>
			<div className={styles.main}>
				<div className={styles.sidebar}>
					<SideNav links={["profile", "notes"]} />
				</div>
				<div
					className={styles["content"]}
					data-testid='children-container'
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export { Layout }
