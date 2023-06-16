import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import useLogout from '../../api/hooks/useLogout'
import useUserStore from '../../stores/authstore'
import UserNavDropdown from '../UserNavDropdown/UserNavDropdown'
import { BookOpen } from '../icons'
import styles from './TopNavbar.module.scss'

interface TopNavbar {
	sideBarOpen: () => void
}

const TopNavBar = ({ sideBarOpen }: TopNavbar) => {
	const navigate = useNavigate()
	const { execute, loading } = useLogout()
	const { currentUser, resetUser } = useUserStore()
	const { pathname } = useLocation()

	useEffect(() => {
		if (!loading && !currentUser?.token) {
			if (pathname !== '/login' && pathname !== '/register') {
				navigate('/login')
			}
		}
	}, [loading, currentUser, navigate])

	const handleLogout = async () => {
		execute()
		resetUser()
		navigate('/login')
	}

	return (
		<AppBar position="static" className={styles.navbar}>
			<Toolbar className={styles.toolbar} variant="dense">
				<Box component="div" className={styles.content}>
					<IconButton
						className={styles.sidebartoggler}
						aria-label="Toggle sidebar"
						onClick={sideBarOpen}
					>
						<MenuIcon />
					</IconButton>
					<NavLink className={styles.brand} to="/">
						<i>N</i>otes <BookOpen height={60} width={60} />
					</NavLink>

					<UserNavDropdown
						currentUser={currentUser}
						handleLogout={handleLogout}
					/>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default TopNavBar
