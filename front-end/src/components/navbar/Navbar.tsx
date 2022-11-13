import useUserStore from "../../stores/store"
import Button from "../button/Button"
import styles from "./Navbar.module.scss"

const Navbar = () => {
	const currentUser = useUserStore()
	return (
		<nav className={styles.navbar}>
			{currentUser ? (
				<Button
					onClick={() => console.log("teehee")}
					text='sign out'
					type='button'
				/>
			) : (
				<div className={styles.button_group}>
					<Button
						onClick={() => console.log("teehee")}
						text='login'
						type='button'
					/>
					<Button
						onClick={() => console.log("teehee")}
						text='signup'
						type='button'
					/>
				</div>
			)}
		</nav>
	)
}

export default Navbar
