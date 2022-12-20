import useGetUserNotes from "../api/hooks/getUserNotes"
import { useUserStore } from "../stores/authstore"

type Props = {}

const Notes = (props: Props) => {
	const user = useUserStore()
	const notes = useGetUserNotes("string")

	return <div>12345</div>
}

export default Notes
