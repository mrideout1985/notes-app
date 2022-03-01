import React, { useContext } from "react"
import { UserContext } from "../stores/userContext"
import styles from "../styles/pagestyles/profile.module.scss"

type Props = {}

const Profile = (props: Props) => {
	const { user } = useContext(UserContext)

	return <div className={styles["container"]}>{user}</div>
}

export { Profile }
