import useUserStore from '@/stores/authstore'
import { useNavigate } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap'

import { logout } from '../../api/services/services'
import { BookOpen } from '../icons'
import UserNavDropdown from '../UserNavDropdown/UserNavDropdown'
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
		<Navbar dark className={styles.navbar}>
			<NavbarToggler
				tag="button"
				className={styles.sidebartoggler}
				aria-label="Toggle sidebar"
				onClick={sideBarOpen}
			/>
			<NavbarBrand className={styles.brand} href="/">
				<i>N</i>otes <BookOpen height={'4rem'} width={'4rem'} />
			</NavbarBrand>

			<UserNavDropdown
				currentUser={currentUser}
				handleLogout={handleLogout}
			/>
		</Navbar>
	)
}

export default TopNavBar
