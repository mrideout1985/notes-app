import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import styles from "../styles/pagestyles/profile.module.scss"

type Props = {}

const Profile = (props: Props) => {
	const { user } = useAuth()
	let navigate = useNavigate()
	if (user === null) {
		navigate("/login")
	}
	console.log(user)
	return <div className={styles["container"]}>{user}</div>
}

export { Profile }
