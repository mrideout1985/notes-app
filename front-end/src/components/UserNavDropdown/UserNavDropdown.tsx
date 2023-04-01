import { User } from '@/stores/authstore'
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import SvgUser from '../icons/User'
import styles from './UserNavDropdown.module.scss'

interface UserNavDropdownInteface {
	handleLogout: () => void
	currentUser: User | null
}

const UserNavDropdown = ({
	handleLogout,
	currentUser,
}: UserNavDropdownInteface) => {
	return (
		currentUser && (
			<UncontrolledDropdown
				aria-hidden={currentUser?.token ? false : true}
				aria-label="user options dropdown"
				className={styles.dropdown}
				a11y
			>
				<DropdownToggle
					aria-label="dropdown button"
					className={styles.dropdowntoggle}
				>
					<SvgUser height="3rem" width="3rem" />
				</DropdownToggle>

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
			</UncontrolledDropdown>
		)
	)
}

export default UserNavDropdown
