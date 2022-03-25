import { useAuth } from "../hooks/useAuth"
import styles from "../styles/pagestyles/profile.module.scss"

type Props = {}

const Profile = (props: Props) => {
	const { user } = useAuth()

	return <div className={styles["container"]}>{user && user.email}</div>
}

export { Profile }
