import { useState } from "react"
import useAuth from "../../api/hooks/auth"
import useUserStore from "../../stores/store"
import Button from "../button/Button"
import styles from "./Navbar.module.scss"

const Navbar = () => {
	const user = useUserStore()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const userAuth = useAuth()

	const handleAuth = () => {
		userAuth.execute("login", "cat@cat.com", "cockring123")
	}
	return (
		<nav className={styles.navbar}>
			<div className={styles.button_group}>
				<Button
					onClick={handleAuth}
					text='login'
					type='button'
				></Button>
				1
				{/* <Button onClick={} text='signup' type='button'></Button> */}
			</div>
		</nav>
	)
}

export default Navbar
