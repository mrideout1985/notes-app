import useGetUser from "../api/hooks/getUserNotes"
import { useUserStore } from "../stores/authstore"

type Props = {}

const Notes = (props: Props) => {
	const auth = useUserStore()
	const getNotes = useGetUser(auth.currentUser)

	return <div></div>
}

export default Notes
