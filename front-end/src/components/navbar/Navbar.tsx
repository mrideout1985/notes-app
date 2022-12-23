import { useNavigate } from "react-router-dom"
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	UncontrolledDropdown,
} from "reactstrap"
import { logout } from "../../api/services/services"
import { BookOpen } from "../icons"
import SvgUser from "../icons/User"
import styles from "./Navbar.module.scss"

interface TopNavbar {
	sideBarOpen: () => void
}

const TopNavBar = ({ sideBarOpen }: TopNavbar): JSX.Element => {
	const navigate = useNavigate()
	const handleLogout = async () => {
		await logout()
		navigate("/login")
	}

	return (
		<Navbar className={styles.navbar} dark>
			<>
				<NavbarToggler
					tag='button'
					className={styles.sidebartoggler}
					aria-label='Toggle sidebar'
					onClick={sideBarOpen}
				/>
				<NavbarBrand className={styles.brand} href='/'>
					Notes <BookOpen />
				</NavbarBrand>
				<UncontrolledDropdown className={styles.dropdown}>
					<DropdownToggle className={styles.dropdowntoggle}>
						<SvgUser />
					</DropdownToggle>
					{localStorage.getItem("token") && (
						<DropdownMenu right className={styles.dropdownmenu}>
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
			</>
		</Navbar>
	)
}

export default TopNavBar
