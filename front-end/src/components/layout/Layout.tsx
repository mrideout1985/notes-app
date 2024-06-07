import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'
import TopNavBar from '../TopNavbar/TopNavbar'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.scss'

const Layout = () => {
	const [sideBarOpen, setSideBarOpen] = useState(false)

	const handleSideBar = () => {
		setSideBarOpen(!sideBarOpen)
	}

	return (
		<Box className={styles.layout}>
			<TopNavBar sideBarOpen={handleSideBar} />
			<main className={styles.main}>
				<Sidebar open={sideBarOpen} />
				<Outlet />
			</main>
		</Box>
	)
}

export default Layout
