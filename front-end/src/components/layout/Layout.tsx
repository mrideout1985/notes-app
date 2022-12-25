import { useState } from "react"
import { Outlet } from "react-router-dom"
import TopNavBar from "../navbar/TopNavbar"
import styles from "./Layout.module.scss"

const Layout = () => {
	const [sideBarOpen, setSideBarOpen] = useState(false)

	const handleSideBar = () => {
		setSideBarOpen(!sideBarOpen)
	}

	return (
		<div className={styles.layout}>
			<TopNavBar sideBarOpen={handleSideBar} />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
