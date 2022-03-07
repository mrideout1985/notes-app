import React from "react"
import styles from "./layout.module.scss"

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return <div className={styles["layout"]}>{children}</div>
}

export { Layout }
