import useUserStore from '@/stores/authstore'
import { useNavigate } from 'react-router-dom'
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	UncontrolledDropdown,
} from 'reactstrap'

import { logout } from '../../api/services/services'
import { BookOpen } from '../icons'
import SvgUser from '../icons/User'
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
			<UncontrolledDropdown
				aria-hidden={currentUser?.token ? false : true}
				aria-label="user options dropdown"
				className={styles.dropdown}
			>
				<DropdownToggle className={styles.dropdowntoggle}>
					<SvgUser height="3rem" width="3rem" />
				</DropdownToggle>
				{currentUser?.token && (
					<DropdownMenu className={styles.dropdownmenu}>
						<DropdownItem>Profile</DropdownItem>
						<DropdownItem>Settings</DropdownItem>
						<>
							<DropdownItem divider />
							<DropdownItem onClick={handleLogout}>
								Logout
							</DropdownItem>
						</>
					</DropdownMenu>
				)}
			</UncontrolledDropdown>
		</Navbar>
	)
}

export default TopNavBar
