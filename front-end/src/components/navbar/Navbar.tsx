import { useContext, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "reactstrap"
import { AuthContext } from "../../stores/AuthProvider"
import AuthModal from "../authmodal/AuthModal"
import styles from "./Navbar.module.scss"

const Navbar = () => {
	const auth = useContext(AuthContext)
	const [open, setOpen] = useState(false)
	const form = useFormContext()

	const closeModal = () => {
		setOpen(false)
	}

	const openModal = () => {
		setOpen(true)
	}

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.button_group}>
					{!auth.user ? (
						<>
							<Button onClick={openModal}>Login</Button>
							<Button onClick={openModal}>Register</Button>
						</>
					) : (
						<Button>Logout</Button>
					)}
				</div>
			</nav>
			<AuthModal isOpen={open} closeModal={closeModal} />
		</>
	)
}

export default Navbar
