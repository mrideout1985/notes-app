import React from "react"
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
import styles from "./TopNavbar.module.scss"

interface TopNavbar {
	sideBarOpen: () => void
}

const TopNavBar = ({ sideBarOpen }: TopNavbar) => {
	const navigate = useNavigate()
	const user = localStorage.getItem("token") // temporary until i fix the store
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
					<i>N</i>otes <BookOpen />
				</NavbarBrand>
				<UncontrolledDropdown
					aria-hidden={user ? "false" : "true"}
					className={styles.dropdown}
				>
					<DropdownToggle className={styles.dropdowntoggle}>
						<SvgUser />
					</DropdownToggle>
					{user && (
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
