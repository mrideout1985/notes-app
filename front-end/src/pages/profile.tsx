import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
import styles from "../styles/pagestyles/profile.module.scss"

type Props = {}

const Profile = (props: Props) => {
	const { user } = useAuth0()
	return <div className={styles["container"]}>{user?.name}</div>
}

export default Profile
