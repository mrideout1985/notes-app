import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import styles from "./Layout.module.scss"

const Layout = () => {
	const [sideBarOpen, setSideBarOpen] = useState(false)

	const handleSideBar = () => {
		setSideBarOpen(!sideBarOpen)
	}

	return (
		<div className={styles.layout}>
			<Navbar sideBarOpen={handleSideBar} />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
