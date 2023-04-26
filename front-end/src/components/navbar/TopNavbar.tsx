import useUserStore from '@/stores/authstore'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../api/services/services'
import UserNavDropdown from '../UserNavDropdown/UserNavDropdown'
import { BookOpen } from '../icons'
import styles from './TopNavbar.module.scss'

interface TopNavbar {
	sideBarOpen: () => void
}

const TopNavBar = ({ sideBarOpen }: TopNavbar) => {
	const navigate = useNavigate()
	const { currentUser } = useUserStore()

	const handleLogout = async () => {
		await logout()
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
						<i>N</i>otes <BookOpen height={'4rem'} width={'4rem'} />
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
