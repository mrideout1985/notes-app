import { useEffect, useState } from "react"
import SvgFeedPerson from "../components/icons/FeedPerson"
import { useAuth } from "../hooks/useAuth"
import { userService } from "../services/userService"
import styles from "../styles/pagestyles/profile.module.scss"
import { DisplayNotes } from "./notes"

type Props = {}

interface NotesArray {
	notes: DisplayNotes[]
	completed: boolean
}

const Profile = (props: Props) => {
	const [displayedNotes, setDisplayedNotes] = useState<NotesArray[]>()

	const { user } = useAuth()

	const fetchNotes = () =>
		userService
			.getLoggedInUserNotes()
			.then(res => setDisplayedNotes(res.notes))

	useEffect(() => {
		fetchNotes()
	}, [])

	return (
		<div className={styles["container"]}>
			<div className={styles["profile"]}>
				<div className={styles["user"]}>
					<SvgFeedPerson color={"white"} size={150} />
					<h1>{user.email}</h1>
					<div className={styles["data"]}>
						<p>You have {displayedNotes?.length} notes</p>
						<p>
							You have{" "}
							{
								displayedNotes?.filter(
									el => el.completed === true
								).length
							}{" "}
							completed notes.
						</p>
						<p>
							You have{" "}
							{
								displayedNotes?.filter(
									el => el.completed === false
								).length
							}{" "}
							uncompleted notes.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Profile }
